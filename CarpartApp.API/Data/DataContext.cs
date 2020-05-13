using CarpartApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CarpartApp.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> opts) : base
        (opts){}

        public DbSet<Client> Clients { get; set; }
        public DbSet<Product> Products {get;set;}
        public DbSet<Order> Orders {get;set;}
        public DbSet<OrderItem> OrderItems{get;set;}

    }
}