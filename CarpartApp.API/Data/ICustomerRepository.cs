using System;
using System.Collections.Generic;
using System.Threading.Tasks;
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

    }
}