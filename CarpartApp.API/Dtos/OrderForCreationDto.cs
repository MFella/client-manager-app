using System;
using System.Collections.Generic;

namespace CarpartApp.API.Dtos
{
    public class OrderForCreationDto
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public string Status {get;set;} = "Created";
        public string OrderType{get;set;}
        public double Total{get;set;}
        public DateTime OrderDate{get;set;} = DateTime.Now;
        public DateTime DeliverDate{get;set;} = DateTime.Now;
        public List<int> ProductId { get; set; }
        public List<int> QuantityProd {get;set;}
    }
}