namespace CarpartApp.API.Dtos
{
    public class OrderForListDto
    {
        public int Id { get; set; }
        public int ClientId{get;set;}
        public string Status{get;set;}
        public string OrderType{get;set;}
        public double Total{get;set;}

    }
}