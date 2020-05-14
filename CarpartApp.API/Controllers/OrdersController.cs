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
            var orderItems = await _repo.GetOrderItems(orderId);

            // order = new Order
            // {
            //     ClientId = clientId,
            //     Status = 
            // }

            return Unauthorized();
        }

        [HttpGet("{clientId}")]
        public async Task<IActionResult> GetOrdersForList(int clientId)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            //lack of implementation for admin...

            var orders = await _repo.GetOrders(clientId);
            
            foreach(var item in orders)
            {
                _mapper.Map<OrderForListDto>(item);
            }

            return Ok(orders);

        }

        [HttpGet("{clientId}/{orderId}")]
        public async Task<IActionResult> GetFullOrder(int clientId, int orderId)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var order = await _repo.GetOrder(clientId, orderId);
            var orderProducts = await _repo.GetOrderItems(orderId);

            // foreach(var item in orderProductsId)
            // {
            //     item = item.
            // }

            return Ok(orderProducts);
        }

    }
}