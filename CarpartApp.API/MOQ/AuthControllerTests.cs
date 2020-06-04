using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using CarpartApp.API.Controllers;
using CarpartApp.API.Data;
using CarpartApp.API.Dtos;
using CarpartApp.API.Models;
using Moq;
using Xunit;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace CarpartApp.API.MOQ
{
    public class AuthControllerTests
    {
        [Fact]
        public async Task Register_ShouldReturnCreatedAtRoute_WhenUserNotExists()
        {
            // arrange
            var mockRepo = new Mock<IAuthRepository>();
            var mockMapper = new Mock<IMapper>();
            var mockConf = new Mock<IConfiguration>();
            ClientForRegisterDto c1 = new ClientForRegisterDto{
                Username="test101"
            };
            Client c2 = new Client{
                Username="otherUsername"
            };
            mockRepo.Setup(repo => repo.Register(It.IsAny<Client>(), It.IsAny<string>()))
                .ReturnsAsync(c2); 
            var controllerToTest = new AuthController(mockRepo.Object, mockConf.Object, mockMapper.Object);

            // act
            var canRegister = await controllerToTest.Register(c1);

            // assert
            Assert.IsType<CreatedAtRouteResult>(canRegister);
        }

        [Fact]
        public async Task RegisterShouldReturnBadRequest_IfUserAlreadyExists()
        {
            // arrange
            var mockRepo = new Mock<IAuthRepository>();
            var mockMapper = new Mock<IMapper>();
            var mockConf = new Mock<IConfiguration>();
            ClientForRegisterDto c1 = new ClientForRegisterDto{
                Username="test"
            };

            mockRepo.Setup(repo => repo.UserExists(c1.Username)).ReturnsAsync(true);   
            var controllerToTest = new AuthController(mockRepo.Object, mockConf.Object, mockMapper.Object);
            
            //act
            var res = await controllerToTest.Register(c1);

            //assert
            Assert.IsType<BadRequestObjectResult>(res);

        }
 
        [Fact]
        public async Task Login_ShouldReturnUnathorized_IfUsernameNotExist()
        {
            // arrange
            var mockRepo = new Mock<IAuthRepository>();
            var mockMapper = new Mock<IMapper>();
            var mockConf = new Mock<IConfiguration>();
            ClientForLoginDto c1 = new ClientForLoginDto{
                Username="username1",
                Password="password1"
            };
            string username = "username";
            string password = "password";

            //act
            mockRepo.Setup(rep => rep.UserExists(username)).ReturnsAsync(false);
            mockRepo.Setup(rep => rep.Login(username, password)).ReturnsAsync((Client)null);
            var controllerToTest = new AuthController(mockRepo.Object, mockConf.Object, mockMapper.Object);

            var res = await controllerToTest.Login(c1);

            //assert
            Assert.IsType<UnauthorizedResult>(res);
        }

        [Fact]
        public async Task Login_ShouldReturnBadRequest_IfUserExistsAndStartUpClass_IsOff()
        {
            //arrange

            var mockRepo = new Mock<IAuthRepository>();
            var mockMapper = new Mock<IMapper>();
            var mockConf = new Mock<IConfiguration>();
            Client c1 = new Client{
                Id=1,
                Username = "username1"
            };
            string username = "username1";
            string password = "password1";

            ClientForLoginDto cfl = new ClientForLoginDto{
                Username = "username1",
                Password = "password1"
            };
              
            mockConf.Setup(conf => conf.GetSection("AppSettings:Token"));
            mockRepo.Setup(repo => repo.Login(username, password)).ReturnsAsync(c1);
            var authController = new AuthController(mockRepo.Object, mockConf.Object, mockMapper.Object);
            //failing during creating symmetricKey
            var res = await authController.Login(cfl);

            Assert.IsType<BadRequestObjectResult>(res);
        }
    }
}