using System.ComponentModel.DataAnnotations;
namespace CarpartApp.API.Dtos
{
    public class ClientForRegisterDto
    {
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(10, MinimumLength = 5, ErrorMessage="You must type password between 5 and 10 characters")]
        public string Password { get; set; }
    }
}