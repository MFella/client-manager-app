using System;
using System.Collections.Generic;

namespace CarpartApp.API.Models
{
    public class Order
    {
        public int Id{get;set;}
        public int IdClient{get;set;}

        public string Status{get;set;}
        public string OrderType{get;set;}
        public double Total{get;set;}
        public DateTime OrderDate{get;set;}
        public DateTime DeliverDate{get;set;}
        public ICollection<OrderItem> OrderRecord{get;set;}

    }
}
