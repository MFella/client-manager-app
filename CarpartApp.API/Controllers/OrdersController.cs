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

        [HttpPost("book/{clientId}")]
        public async Task<IActionResult> BookOrder(int clientId,
        OrderForCreationDto orderForCreationDto)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            if(await _repo.GetCustomer(clientId) == null)
            {
                return NotFound();
            }
            if(orderForCreationDto.ProductId.Count == 0)
            {
                return BadRequest("There is no items! Add something to basket, and order!");
            }

             var toOrderTable = _mapper.Map<Order>(orderForCreationDto);
            
            toOrderTable.ClientId = clientId;
            var addedOrder = await _repo.BookOrderAsync(toOrderTable);
             
            var orderItems = new List<OrderItem>();

            var iterator = 0;
            foreach(var it in orderForCreationDto.ProductId)
            {
                
                var newOrderItem = new OrderItem
                {
                    Quantity = orderForCreationDto.QuantityProd[iterator],
                    OrderId = addedOrder.Id,
                    ProductId = orderForCreationDto.ProductId[iterator]
                };
                orderItems.Add(newOrderItem);
                
                iterator++;
            }

            var toOrderItemsTable = await _repo.BookOrderItemsAsync(orderItems);
            iterator = 0; 
            return Ok(new {toOrderTable, toOrderItemsTable});

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
            var retList = new List<ProductForOrderDto>();
            var qtyNumbs = new List<int>();
            foreach(var item in orderProducts)
            {
                var itemToRet =  _mapper.Map<ProductForOrderDto>(item);
                retList.Add(itemToRet);
            }

            return Ok(order);
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

        [HttpGet("{clientId}")]
        public async Task<IActionResult> RetrieveBasket(int clientId)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var returnedBasket = await _repo.RetrieveBasket(clientId);

            if(returnedBasket == null)
            {
                return BadRequest("You havent got already your basket ;/");
            }

            return Ok(returnedBasket);
        }

    }
}