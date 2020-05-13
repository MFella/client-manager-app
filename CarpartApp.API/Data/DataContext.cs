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

    protected override void OnModelCreating(ModelBuilder builder)
    {
    


      builder.Entity<Order>()
        .HasMany(o => o.OrderItems)
        .WithOne(o => o.Order)
        .HasForeignKey(o => o.OrderId)
        .OnDelete(DeleteBehavior.Cascade);

      builder.Entity<Order>()
        .HasOne(o => o.Client)
        .WithMany(o => o.Orders)
        .HasForeignKey(o => o.ClientId)
        .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<OrderItem>()
            .HasKey(k => new {k.OrderId, k.ProductId});
        
        builder.Entity<OrderItem>()
            .HasOne(o => o.Product)
            .WithMany(o => o.OrderItems)
            .HasForeignKey(o => o.ProductId)
            .OnDelete(DeleteBehavior.Restrict);

    }

    }
    

}