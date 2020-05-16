using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CarpartApp.API.Dtos;
using CarpartApp.API.Helpers;
using CarpartApp.API.Models;

namespace CarpartApp.API.Data
{
    public interface ICustomerRepository
    {
        
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<Client> GetCustomer(int id);
         Task<Product> GetProduct(int id);
         Task<PagList<Product>> GetProducts(ProdParams prodParams);
         Task<Order> GetOrder(int clientId, int orderId);
         Task<List<Order>> GetOrders(int clientId);
         Task<List<Product>> GetOrderItems(int orderId);
         Task<Order> BookOrderAsync(Order order);
         Task<List<OrderItem>> BookOrderItemsAsync(List<OrderItem> orderItems);
         Task<bool> DeleteOrderItemAsync(int orderId, int productId);
         Task<bool> OrderExists(int orderId);
         Task<Order> RetrieveBasket(int clientId);
         Task<Order> CreateBasket(int clientId);
         Task<Order> ChangeStatus(int orderId, string newStatus);
         Task<Order> SaveOrder(int orderId, OrderForCreationDto orderForCreationDto);
    }
}