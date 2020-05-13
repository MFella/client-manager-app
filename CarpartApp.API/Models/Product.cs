using System.Collections.Generic;

namespace CarpartApp.API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Price { get; set; }
        public string Status{get;set;}
        public ICollection<OrderItem> OrderItems{get;set;}
    }
}