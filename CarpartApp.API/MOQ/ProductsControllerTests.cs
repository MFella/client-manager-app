using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.Configuration;
using CarpartApp.API.Controllers;
using CarpartApp.API.Data;
using CarpartApp.API.Dtos;
using CarpartApp.API.Helpers;
using CarpartApp.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;
namespace CarpartApp.API.MOQ
{
    public class ProductsControllerTests
    {
        [Fact]
        public async Task GetProduct_ShouldReturnOkObjectResult()
        {
             // arrange
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            Product p1 = new Product{
                Id = 1
            };

            mockRepo.Setup(repo => repo.GetProduct(It.IsAny<int>()))
                .ReturnsAsync(p1);
            
            var controller = new ProductsController(mockRepo.Object, mockMapper.Object);
            //arrange
            var res = await controller.GetProduct(p1.Id);

            //assert
            Assert.IsType<OkObjectResult>(res);
        }

        [Fact]
        public async Task GetProducts_ShouldReturnOkObjectResult()
        {
             // arrange
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            ProdParams par1 = new ProdParams();
            List<Product> core = new List<Product>{new Product{Id = 1},new Product{ Id = 2}};
            PagList<Product> p1 = new PagList<Product>(core,1,1,2);

            //var header = 

            mockRepo.Setup(repo => repo.GetProducts(It.IsAny<ProdParams>()))
                .ReturnsAsync(p1);

            var controller = new ProductsController(mockRepo.Object, mockMapper.Object);
            var mockResponse = new Mock<HttpResponse>();
            mockResponse.Setup(_ => _.AddPag(1,2,1,1));

            //arrange
            controller.Response.AddPag(1,2,1,1);
            var res = await controller.GetProducts(par1);

            //assert
            Assert.IsType<OkObjectResult>(res);
        }

        [Fact]
        public async Task AddProduct_ShouldReturnOkObjectResult_IfClientIsAdmin()
        {
            int mockClientId = 1;
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            Client client = new Client{
                Id = 1,
                IsAdmin = true
            };
            Product prodToAdd = new Product{
                Id=1,
                Name="Dummy name",
                Description = "Dummy Description",
                Price = 24.5,
                Status = "AVAILABLE"
            };
            ProductForCreationDto p1 = new ProductForCreationDto{Name = prodToAdd.Name,
             Description = prodToAdd.Description, Price = prodToAdd.Price, Status = prodToAdd.Status};

            mockRepo.Setup(repo => repo.GetCustomer(mockClientId)).ReturnsAsync(client);
            mockRepo.Setup(repo => repo.AddProduct(prodToAdd)).ReturnsAsync(prodToAdd);

            var controller = new ProductsController(mockRepo.Object, mockMapper.Object);

            var res = await controller.AddProduct(p1, client.Id);

            Assert.IsType<OkObjectResult>(res);
        }

        [Fact]
        public async Task AddProduct_ShouldReturnBadRequest_IfClientIsNotAdmin()
        {
            int mockClientId = 1;
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            Client client = new Client{
                Id = 1,
                IsAdmin = false
            };
            Product prodToAdd = new Product{
                Id=1,
                Name="Dummy name",
                Description = "Dummy Description",
                Price = 24.5,
                Status = "AVAILABLE"
            };
            ProductForCreationDto p1 = new ProductForCreationDto{Name = prodToAdd.Name,
             Description = prodToAdd.Description, Price = prodToAdd.Price, Status = prodToAdd.Status};

            mockRepo.Setup(repo => repo.GetCustomer(mockClientId)).ReturnsAsync(client);

            var controller = new ProductsController(mockRepo.Object, mockMapper.Object);

            var res = await controller.AddProduct(p1, client.Id);

            Assert.IsType<BadRequestObjectResult>(res);
        }

        [Fact]
        public async Task DeleteItem_ShouldReturnNoContent_IfClientIsAdmin()
        {
            int mockProdId = 1;
            int mockClientId = 1;
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            Client client = new Client{
                Id = 1,
                IsAdmin = true
            };

            mockRepo.Setup(repo => repo.GetCustomer(mockClientId)).ReturnsAsync(client);
            mockRepo.Setup(repo => repo.DeleteProduct(mockProdId)).ReturnsAsync(true);

            var controller = new ProductsController(mockRepo.Object, mockMapper.Object);

            var res = await controller.DeleteProduct(mockProdId, mockClientId);

            Assert.IsType<NoContentResult>(res);
        }

        [Fact]
        public async Task DeleteItem_ShouldReturnUnauthorized_IfClientIsNotAdmin()
        {
            int mockProdId = 1;
            int mockClientId = 1;
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            Client client = new Client{
                Id = 1,
                IsAdmin = false
            };

            mockRepo.Setup(repo => repo.GetCustomer(mockClientId)).ReturnsAsync(client);
            mockRepo.Setup(repo => repo.DeleteProduct(mockProdId)).ReturnsAsync(true);

            var controller = new ProductsController(mockRepo.Object, mockMapper.Object);

            var res = await controller.DeleteProduct(mockProdId, mockClientId);

            Assert.IsType<UnauthorizedResult>(res);
        }
        
        [Fact]
        public async Task UpdateProduct_ShouldReturnNoContent_IfClientIsAdmin()
        {
            int mockClientId = 1;
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            Client client = new Client{
                Id = 1,
                IsAdmin = true
            };
            ProductForUpdateDto p1 = new ProductForUpdateDto{Id = 1};

            mockRepo.Setup(repo => repo.GetCustomer(mockClientId)).ReturnsAsync(client);
            mockRepo.Setup(repo => repo.UpdateProduct(p1)).ReturnsAsync(true);

            var controller = new ProductsController(mockRepo.Object, mockMapper.Object);

            var res = await controller.UpdateProduct(p1, mockClientId);

            Assert.IsType<NoContentResult>(res);
        }

        [Fact]
        public async Task UpdateProduct_ShouldReturnUnauthorized_IfClientIsNotAdmin()
        {
            int mockClientId = 1;
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            Client client = new Client{
                Id = 1,
                IsAdmin = false
            };
            ProductForUpdateDto p1 = new ProductForUpdateDto{Id = 1};

            mockRepo.Setup(repo => repo.GetCustomer(mockClientId)).ReturnsAsync(client);
            mockRepo.Setup(repo => repo.UpdateProduct(p1)).ReturnsAsync(false);

            var controller = new ProductsController(mockRepo.Object, mockMapper.Object);

            var res = await controller.UpdateProduct(p1, mockClientId);

            Assert.IsType<UnauthorizedResult>(res);
        }

    }
}