namespace CarpartApp.API.Models
{
    public class Client
    {
        public int Id { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Postcode { get; set; }
        public string Street{get;set;}
        public string Email{get;set;}
        public string TelNo{get;set;}
        public bool IsAdmin{get;set;} = false;
    }
}