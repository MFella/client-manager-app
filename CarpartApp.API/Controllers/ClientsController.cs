using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CarpartApp.API.Data;
using CarpartApp.API.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarpartApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClientsController: ControllerBase
    {
        private readonly ICustomerRepository _repo;
        private readonly IMapper _mapper;
        public ClientsController(ICustomerRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }
        [HttpGet("{id}", Name = "GetClient")]
        public async Task<IActionResult> GetClient(int id)
        {
            var client = await _repo.GetCustomer(id);

            var clientToReturn = _mapper.Map<ClientDetailedDto>(client);

            return Ok(clientToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClient(int id, ClientDetailedDto clientDetailedDto)
        {
            if(id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var clientFromRepo = await _repo.GetCustomer(id);

            _mapper.Map(clientDetailedDto, clientFromRepo);

            if(await _repo.SaveAll())
            {
                return NoContent();
            } else return NoContent();

            //user updating issue
            //throw new Exception("Updating failed. User number: " + id.ToString());

        }
    }
}