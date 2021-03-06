using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarpartApp.API.Dtos;
using CarpartApp.API.Helpers;
using CarpartApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CarpartApp.API.Data
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly DataContext _context;
        public CustomerRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Client> GetCustomer(int id)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(c => c.Id == id);
            return client;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public async Task<Product> GetProduct(int id)
        { 
            var prod = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            return prod;
        }

        public async Task<PagList<Product>> GetProducts(ProdParams prodParams)
        {
            var prods = _context.Products.OrderByDescending(p => p.Name).AsQueryable();

            if(prodParams.Phrase.Length != 0){ 
                prods = _context.Products.Where(p => p.Name.ToLower()
                .Contains(prodParams.Phrase.ToLower())).AsQueryable();
            } 
            
            switch(prodParams.OrderBy)
            {
                case "NameAsc":
                prods = prods.OrderBy(p => p.Name).AsQueryable();
                break;
                case "NameDesc":
                prods = prods.OrderByDescending(p => p.Name).AsQueryable();
                break;
                case "PriceAsc":
                prods = prods.OrderBy(p => p.Price).AsQueryable();
                break;
                case "PriceDesc":
                prods = prods.OrderByDescending(p => p.Price).AsQueryable();
                break;
                default:
                prods = prods.OrderBy(p => p.Name).AsQueryable();
                break;             
            }
          
            return await PagList<Product>.CreateAsync(prods, prodParams.PageNo, prodParams.PageSize);
        }

        public async Task<Order> GetOrder(int clientId, int orderId, bool isAdmin)
        {
            if(isAdmin)
            {
            return await _context.Orders.FirstOrDefaultAsync(o =>  o.Id == orderId);
            }

            return await _context.Orders.FirstOrDefaultAsync(o => 
            o.ClientId == clientId && o.Id == orderId);
        }

        public async Task<List<Order>> GetOrders(int clientId, bool isAdmin)
        {
            //return await _context.OrderItems.Where(p => p.OrderId == orderId).ToListAsync();
            if(isAdmin)
            {
                return await _context.Orders.Where(p => p.Status != null).ToListAsync();
            }

            //standard return
            return await _context.Orders.Where(p => p.ClientId == clientId).ToListAsync();
        }

        public async Task<List<Product>> GetOrderItems(int orderId)
        {
            var items = await _context.OrderItems.Where(i => i.OrderId == orderId).ToArrayAsync();
            var prods = new List<Product>();
            foreach(var item in items)
            {
                var temp =  _context.Products.Where(p => p.Id == item.ProductId).ToList();
                prods.AddRange(temp);
            }

            return prods;
        }

        public async Task<bool> OrderExists(int orderId)
        {
            if (await _context.Orders.AnyAsync(p => p.Id == orderId))
            {
                return true;
            }
            return false;
        }

        public async Task<Order> BookOrderAsync(Order order)
        {
            await _context.AddAsync(order);
            await _context.SaveChangesAsync();

            return order;
        }

        public async Task<List<OrderItem>> BookOrderItemsAsync(List<OrderItem> orderItems)
        {
            foreach(var item in orderItems)
            {
                var hipoteticItem = await _context.OrderItems.FirstOrDefaultAsync(p => p.OrderId == item.OrderId && p.ProductId == item.ProductId);
                if( hipoteticItem != null)
                {
                    return null;
                }
                await _context.AddAsync(item);
            }
            await _context.SaveChangesAsync();
            return orderItems;
        }
        public async Task<bool> DeleteOrderItemAsync(int orderId, int productId)
        {

            if(await _context.OrderItems.AnyAsync(p => p.OrderId == orderId && p.ProductId == productId))
            { 
                //just a mock
                var orderItemToRemove = new OrderItem{OrderId = orderId, ProductId = productId};
                _context.OrderItems.Remove(orderItemToRemove);
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<Order> RetrieveBasket(int clientId)
        {
            var basket =  await _context.Orders.FirstOrDefaultAsync(o => o.ClientId == clientId && o.Status == null); 
            await _context.SaveChangesAsync();
            return basket;
        }

        public async Task<Order> CreateBasket(int clientId)
        {
            //basket - order with special 'Status' value (of null!)
            var basketOrder = new Order 
            {
                ClientId = clientId,
                Status = null,
                OrderType = null,
                Total = 0,
                OrderDate = new DateTime(1000, 10, 10),
                DeliverDate = new DateTime(1000, 10, 10)
            };
            await _context.Orders.AddAsync(basketOrder);
            await _context.SaveChangesAsync();
            return basketOrder;
        }

        public async Task<Order> ChangeStatus(int orderId, string newStatus)
        {
           var xd =  await _context.Orders.FirstOrDefaultAsync(p => p.Id == orderId);
           xd.Status = newStatus;
           await _context.SaveChangesAsync();
           return xd;

        }

        public async Task<Order> SaveOrder(int orderId, OrderForCreationDto orderForCreationDto)
        {
            var basketFromRepo = await _context.Orders.FirstOrDefaultAsync(p => p.Id == orderId);
            basketFromRepo.Status = orderForCreationDto.Status;
            basketFromRepo.OrderType = orderForCreationDto.OrderType;
            basketFromRepo.Total = orderForCreationDto.Total;
            basketFromRepo.OrderDate = orderForCreationDto.OrderDate;
            basketFromRepo.DeliverDate = orderForCreationDto.DeliverDate;
            int inc = 0;
            var orderItems = await _context.OrderItems.Where(p => p.OrderId == orderId).ToListAsync();
            foreach(var item in orderItems)
            {
                item.Quantity = orderForCreationDto.Quantities[inc]; 
                inc++;
            } 
            // for(int x = 0; x < orderForCreationDto.Quantities.Count; x++)
            // {
            //     var orderItem = await _context.OrderItems
            //     .FirstOrDefaultAsync(p => p.ProductId == orderForCreationDto.ProductIds[x] && p.OrderId == orderId);
            //     orderItem.Quantity = orderForCreationDto.Quantities[x];
            // }
            await _context.SaveChangesAsync();
            return basketFromRepo;
        }
        public async Task<Product> AddProduct(Product product)
        {
            await _context.Products.AddAsync(product);
            await _context.SaveChangesAsync();
            return product;
        }
        public async Task<bool> DeleteProduct(int productId)
        {
            var x = await _context.OrderItems.FirstOrDefaultAsync(p => p.ProductId == productId);
            if(x == null)
            {
                var toRemove = await _context.Products.FirstOrDefaultAsync(p => p.Id == productId);
                 _context.Products.Remove(toRemove);
                 await _context.SaveChangesAsync();
                 return true;
            } 
            return false;
        }

        public async Task<bool> UpdateProduct(ProductForUpdateDto productForCreationDto)
        {
            var x = await _context.Products.FirstOrDefaultAsync(p => p.Id == productForCreationDto.Id);

            if(x != null)
            {
                x.Name = productForCreationDto.Name;
                x.Description = productForCreationDto.Description;
                x.Price = productForCreationDto.Price;
                x.Status = productForCreationDto.Status;
                await _context.SaveChangesAsync();
                return true;
            }
            return false;
        }
    }
}