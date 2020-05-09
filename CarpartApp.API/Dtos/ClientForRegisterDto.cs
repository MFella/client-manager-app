using System.ComponentModel.DataAnnotations;
namespace CarpartApp.API.Dtos
{
    public class ClientForRegisterDto
    {
        [Required]
        [StringLength(12, MinimumLength = 4, ErrorMessage="You must type username between 5 and 10 characters")]
        public string Username { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 5, ErrorMessage="You must type password between 5 and 10 characters")]
        public string Password { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        [Required]
        public string Email { get; set; }
        public string TelNo { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Postcode { get; set; }
        public string Street { get; set; }

    }
}