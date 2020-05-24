using System.Threading.Tasks;
using AutoMapper;
using CarpartApp.API.Data;
using CarpartApp.API.Helpers;
using Microsoft.AspNetCore.Mvc;
using CarpartApp.API.Dtos;
using CarpartApp.API.Models;
using System.Security.Claims;

namespace CarpartApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController: ControllerBase
    {
        private readonly ICustomerRepository _repo;
        private readonly IMapper _mapper;
        public ProductsController(ICustomerRepository repo, IMapper mapper)
        {
            _mapper = mapper;
            _repo = repo;
        }
        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(int id)
        {
            var product = await _repo.GetProduct(id);
            
            return Ok(product);
        }

        [HttpGet]
        public async Task<IActionResult> GetProducts([FromQuery]ProdParams prodParams)
        {

            var products = await _repo.GetProducts(prodParams);

            Response.AddPag(products.CurrPage, products.PageSize
            , products.TotCount, products.TotPages);
            return Ok(products);
        }

        [HttpPost("addItem/{clientId}")]
        public async Task<IActionResult> AddProduct(ProductForCreationDto product, int clientId)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var client = await _repo.GetCustomer(clientId);

            if(client.IsAdmin)
            {
                //have to handle situation when we are adding items, which are already in store..
                var prodToAdd = _mapper.Map<Product>(product);
                await _repo.AddProduct(prodToAdd);
                return Ok(prodToAdd);
            }

            return BadRequest("You are not an admin!");
        }

        [HttpPost("deleteItem/{clientId}")]
        public async Task<IActionResult> DeleteProduct([FromBody]int productId, int clientId)
        {
            if(clientId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var client = await _repo.GetCustomer(clientId);

            if(client.IsAdmin)
            {
                var isDeleted = await _repo.DeleteProduct(productId);

                if(isDeleted)
                {
                    return NoContent();
                }
                return BadRequest("Item is in at least one of orders - cant remove!");
            }

            return Unauthorized();
        }
    } 
}