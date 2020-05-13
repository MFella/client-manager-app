using System.Threading.Tasks;
using AutoMapper;
using CarpartApp.API.Data;
using CarpartApp.API.Helpers;
using Microsoft.AspNetCore.Mvc;

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
    }
}