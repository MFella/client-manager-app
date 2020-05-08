using System.Threading.Tasks;
using CarpartApp.API.Models;

namespace CarpartApp.API.Data
{
    public interface IAuthRepository
    {
         Task<Client> Register(Client client, string password);
         Task<Client> Login(string username, string password);
         Task<bool> UserExists(string username);
    }
}