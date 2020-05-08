using System;
using System.Threading.Tasks;
using CarpartApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace CarpartApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext _context;
        public AuthRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Client> Login(string username, string password)
        {
            var client = await _context.Clients.FirstOrDefaultAsync(x => x.Username == username);

            if(client == null) return null;

            if(!VerifyPasswordHash(password, client.PasswordHash, client.PasswordSalt))
                return null;

            return client;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                
                var compHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for(int i = 0; i < compHash.Length; i++)
                {
                    if(compHash[i] != passwordHash[i]) return false;
                }
            }
            return true;
        }

        public async Task<Client> Register(Client client, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            client.PasswordHash = passwordHash;
            client.PasswordSalt = passwordSalt;

            await _context.Clients.AddAsync(client);
            await _context.SaveChangesAsync();

            return client;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
            
        }

        public async Task<bool> UserExists(string username)
        {
            if(await _context.Clients.AnyAsync(x => x.Username == username))
                return true;

            
            return false;
        }
    }
}