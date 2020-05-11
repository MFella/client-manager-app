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

        public async Task<PagList<Product>> GetProducts(ProdParams prodParams)
        {
            //var prods = _context.Products.OrderByDescending(p => p.Name).ToList();
            var prods = _context.Products.OrderBy(p => p.Name);
            return await PagList<Product>.CreateAsync(prods, prodParams.PageNo, prodParams.PageSize);
        }
    }
}