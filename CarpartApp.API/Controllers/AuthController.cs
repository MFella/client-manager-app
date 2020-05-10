using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
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
        private readonly IMapper _mapper;
        public AuthController(IAuthRepository repo, IConfiguration config,
        IMapper mapper)
        {
            _repo = repo;
            _config = config;
            _mapper = mapper;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(ClientForRegisterDto clientForRegisterDto)
        {
            clientForRegisterDto.Username = clientForRegisterDto.Username.ToLower();

            if(await _repo.UserExists(clientForRegisterDto.Username))
                return BadRequest("Username already exists");
        
        var clientToCreate = _mapper.Map<Client>(clientForRegisterDto);
        var createdClient = await _repo.Register(clientToCreate, clientForRegisterDto.Password);
        var clientToRet = _mapper.Map<ClientDetailedDto>(createdClient);

         return CreatedAtRoute("GetClient", new {controller = "Clients", id = createdClient.Id},
         clientToRet);
        //return StatusCode(201);
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

            var client = _mapper.Map<ClientDetailedDto>(clientFromRepo);
            //token go back
            return Ok(new {
                token = tokenHandler.WriteToken(token),
                client
            });
        }

    }
}