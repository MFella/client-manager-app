using AutoMapper;
using CarpartApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarpartApp.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class OrderItemsController: ControllerBase
    {
        private readonly ICustomerRepository _repo;
        private readonly IMapper _mapper;

        public OrderItemsController(ICustomerRepository repo, IMapper mapper)
        {
            _repo = repo; 
            _mapper = mapper;
        }
    }
}