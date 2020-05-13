using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public async Task<Order> GetOrder(int clientId, int orderId)
        {
            return await _context.Orders.FirstOrDefaultAsync(o => 
            o.ClientId == clientId && o.Id == orderId);
        }
    }
}