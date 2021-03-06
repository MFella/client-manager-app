using System;
using System.Collections.Generic;
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
        //How to Book an Order? - Change the Status of an Order( != null)
        [HttpPut("book/{clientId}")]
        public async Task<IActionResult> BookOrder(int clientId, OrderForCreationDto orderForCreationDto)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
  
            // if(await _repo.GetCustomer(clientId) == null)
            // {
            //     return NotFound();
            // }

            var latestBasket = await _repo.RetrieveBasket(clientId);
               
            if(latestBasket == null)
            {
                return BadRequest("There is no Basket!");
            }
            var orderForBasket = await _repo.GetOrderItems(latestBasket.Id);

            if(orderForBasket.Count == 0)
            {
                return BadRequest("There is no products!");
            }
           
            var finalVer = await _repo.SaveOrder(latestBasket.Id, orderForCreationDto);

            //override the quantites of products!
            var itemsToRet = await _repo.GetOrderItems(finalVer.Id);
            return Ok(finalVer);
        }

        [HttpPost("{clientId}")]
        public async Task<IActionResult> GetOrdersForList(int clientId,[FromBody]bool isAdmin)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            //lack of implementation for admin...
 
            var orders = await _repo.GetOrders(clientId, isAdmin);
            
            foreach(var item in orders)
            {
                _mapper.Map<OrderForListDto>(item);
            }

            return Ok(orders);

        }

        [HttpPost("{clientId}/{orderId}")]
        public async Task<IActionResult> GetFullOrder(int clientId, int orderId,[FromBody]bool isAdmin)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var order = await _repo.GetOrder(clientId, orderId, isAdmin);
            var orderProducts = await _repo.GetOrderItems(orderId);
            //var client = await _repo.GetCustomer(order.ClientId);
            var tempClient = await _repo.GetCustomer(order.ClientId);
            var clientToRet = _mapper.Map<ClientDetailedDto>(tempClient);
            var orderToRet  = _mapper.Map<OrderForCreationDto>(order);
            //_mapper.Map(order.Client, clientToRet);
           // _mapper.Map<ClientDetailedDto>(order.Client);
            //order.Client = _mapper.Map<ClientDetailedDto>(await _repo.GetCustomer(order.ClientId));
            // var retList = new List<ProductForOrderDto>();
            // var qtyNumbs = new List<int>();
            // foreach(var item in orderProducts)
            // {
            //     var itemToRet =  _mapper.Map<ProductForOrderDto>(item);
            //     retList.Add(itemToRet);
            // }

            return Ok(new {order.OrderItems, clientToRet, orderToRet});
        }

        [HttpPost("{clientId}/{orderId}/delete/{productId}")]
        public async Task<IActionResult> DeleteItemFromOrder(int orderId, int productId, int clientId)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            if(await _repo.DeleteOrderItemAsync(orderId, productId))
            {
                return NoContent();
            }

            return BadRequest("Item with that combination doesnt exists!");
        }

        [HttpGet("basket/{clientId}")]
        public async Task<IActionResult> RetrieveBasket(int clientId)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var returnedBasket = await _repo.RetrieveBasket(clientId);

            if(returnedBasket == null)
            {
                //have to create the basket
                var createdBasket = await _repo.CreateBasket(clientId);
                return Ok(createdBasket);
            }

            var prodsToBasket = await _repo.GetOrderItems(returnedBasket.Id);

            return Ok(returnedBasket);
        }
        [HttpPost("{clientId}/add/{productId}")]
        public async Task<IActionResult> AddItemToOrder(int clientId, int productId,
        List<OrderItem> toOrder)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            //var toOrder = new OrderItem{ProductId = productId, ClientId = clientId; }
            var orderItem = await _repo.BookOrderItemsAsync(toOrder);

            if(orderItem == null)
            {
                return BadRequest("The item is already in your basket!");
            }
            return Ok(orderItem); 
        }
        [HttpPut("{clientId}/change/{orderId}")]
        public async Task<IActionResult> ChangeStatusOfOrder(int clientId, int orderId,
         [FromBody]string newStatus)
        {

            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var mockAdmin = await _repo.GetCustomer(clientId);

            if(mockAdmin.IsAdmin)
            {
               var toRet = await _repo.ChangeStatus(orderId, newStatus);
               return Ok(toRet);
            }
            return Unauthorized(); 
        }
    }
}