using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CarpartApp.API.Data;
using CarpartApp.API.Dtos;
using CarpartApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace CarpartApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController: ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IConfiguration _config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            _repo = repo;
            _config = config;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(ClientForRegisterDto clientForRegisterDto)
        {
            clientForRegisterDto.Username = clientForRegisterDto.Username.ToLower();

            if(await _repo.UserExists(clientForRegisterDto.Username))
                return BadRequest("Username already exists");
        
        var clientToCreate = new Client{
            Username = clientForRegisterDto.Username
        };

        var createdClient = await _repo.Register(clientToCreate, clientForRegisterDto.Password);

        return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(ClientForLoginDto clientForLoginDto)
        {
            var clientFromRepo = await _repo.Login(clientForLoginDto.Username.ToLower(), clientForLoginDto.Password);

            if(clientFromRepo == null)
            {
                return Unauthorized();
            }
            //Two claims - ClientId, and Client Username
            var claims = new []
            {
                new Claim(ClaimTypes.NameIdentifier, clientFromRepo.Id.ToString()), 
                new Claim(ClaimTypes.Name, clientFromRepo.Username)
            };

            //create security key
            var key = new SymmetricSecurityKey(Encoding.UTF8
            .GetBytes(_config.GetSection("AppSettings:Token").Value));

            //ecrypt key with hashing algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //prepare to create the token
            var tokenDesc = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            
            var token = tokenHandler.CreateToken(tokenDesc);
            //token go back
            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }

    }
}