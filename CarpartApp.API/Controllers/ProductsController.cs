using System.Threading.Tasks;
using AutoMapper;
using CarpartApp.API.Data;
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

        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var products = await _repo.GetProducts();
            return Ok(products);
        }
    }
}