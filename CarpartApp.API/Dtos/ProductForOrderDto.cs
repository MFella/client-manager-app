namespace CarpartApp.API.Dtos
{
    public class ProductForOrderDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description {get;set;}
        public double Price{get;set;}
        public string Status{get;set;}
        public int Quantity{get;set;}

    }
}