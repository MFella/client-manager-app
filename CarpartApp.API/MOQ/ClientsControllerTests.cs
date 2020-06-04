using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using CarpartApp.API.Controllers;
using CarpartApp.API.Data;
using CarpartApp.API.Dtos;
using CarpartApp.API.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace CarpartApp.API.MOQ
{
    public class ClientsControllerTests
    {

        [Fact]
        public async Task GetCustomer_ShouldReturnOkObject()
        {
            //arrange
            int mockCustId = 1;
            Client c1 = new Client{Id = mockCustId};
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();

            mockRepo.Setup(repo => repo.GetCustomer(mockCustId)).ReturnsAsync(c1);
            var controller = new ClientsController(mockRepo.Object, mockMapper.Object);
            
            //act
            var res = await controller.GetClient(mockCustId);

            // assert
            Assert.IsType<OkObjectResult>(res);
        }

        [Fact]
        public async Task UpdateClient_ShouldReturnUnathorized_IfThereIsNoClaims()
        {
            //arrange
            int mockCustId = 1;
            Client c1 = new Client{Id = mockCustId};
            //faked claims:
            var xd = new ClaimsIdentity();
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            var mockContr = new Mock<ProductsController>();

            ClientDetailedDto cd1 = new ClientDetailedDto();

            mockRepo.Setup(repo => repo.GetCustomer(mockCustId)).ReturnsAsync(c1);
            mockRepo.Setup(repo => repo.SaveAll());

            var controller = new ClientsController(mockRepo.Object, mockMapper.Object);
            var mocked = controller.User;

            var res = await controller.UpdateClient(mockCustId, cd1);

            Assert.IsType<UnauthorizedResult>(res);
        }
    }
}