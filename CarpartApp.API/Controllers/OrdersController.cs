using System;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CarpartApp.API.Data;
using CarpartApp.API.Dtos;
using CarpartApp.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarpartApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController: ControllerBase
    {
        private readonly ICustomerRepository _repo;
        private readonly IMapper _mapper;
        public OrdersController(ICustomerRepository repo, IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost("{orderId}/client/{clientId}")]
        public async Task<IActionResult> BookOrder(int orderId, int clientId)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var order = await _repo.GetOrder(orderId, clientId);
            if(order != null)
            {
                return BadRequest("You already ordered!");
            }

            if(await _repo.GetCustomer(clientId) == null)
            {
                return NotFound();
            }

            // order = new Order
            // {
            //     ClientId = clientId,
            //     Status = 
            // }

            return Unauthorized();

        }
    }
}