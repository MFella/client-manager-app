using System.Collections.Generic;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading.Tasks;
using AutoMapper;
using CarpartApp.API.Controllers;
using CarpartApp.API.Data;
using CarpartApp.API.Dtos;
using CarpartApp.API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;
using Xunit;

namespace CarpartApp.API.MOQ
{
    public class OrdersControllerTests
    {
        [Fact]
        public async Task BookOrderReturnUnauthorized_IfIdOfUserDoesntMatch_WithIdInClaims()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            int mockUserId = 2;
            //mockRepo.Setup(repo => repo.)
            OrderForCreationDto d1 =new OrderForCreationDto();

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.BookOrder(mockUserId, d1);

            Assert.IsType<UnauthorizedResult>(res);
        }
        [Fact]
        public async Task BookOrderReturnBadRequest_IfBasketDoesntExist()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            int mockUserId = 1;

            OrderForCreationDto d1 = new OrderForCreationDto();

            mockRepo.Setup(repo => repo.RetrieveBasket(mockUserId)).ReturnsAsync((Order)null);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.BookOrder(mockUserId, d1);

            Assert.IsType<BadRequestObjectResult>(res);
        }
        [Fact]
        public async Task BookOrderReturnBadRequest_IfBasketIsEmpty()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            int mockUserId = 1;
            int mockOrderId = 2;

            OrderForCreationDto d1 = new OrderForCreationDto();
            Order basket = new Order{
                ClientId = mockUserId,
                Id = mockOrderId
            };
            List<Product> orderToBasket = new List<Product>();

            mockRepo.Setup(repo => repo.RetrieveBasket(mockUserId)).ReturnsAsync(basket);
            mockRepo.Setup(repo => repo.GetOrderItems(mockOrderId)).ReturnsAsync(orderToBasket);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.BookOrder(mockUserId, d1);

            Assert.IsType<BadRequestObjectResult>(res);
        }
        [Fact]
        public async Task BookOrderReturnOkObjectResult_IfExistingBasketIsNotEmpty()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            int mockUserId = 1;
            int mockOrderId = 2;

            OrderForCreationDto d1 = new OrderForCreationDto();
            Order basket = new Order{
                ClientId = mockUserId,
                Id = mockOrderId
            };
            List<Product> orderToBasket = new List<Product>{
                new Product(),
                new Product()
            };

            mockRepo.Setup(repo => repo.RetrieveBasket(mockUserId)).ReturnsAsync(basket);
            mockRepo.Setup(repo => repo.GetOrderItems(mockOrderId)).ReturnsAsync(orderToBasket);
            mockRepo.Setup(repo => repo.SaveOrder(mockOrderId, d1)).ReturnsAsync(basket);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.BookOrder(mockUserId, d1);

            Assert.IsType<OkObjectResult>(res);
        }
        [Fact]
        public async Task GetOrdersForList_ShouldReturnOkObject_IfClaimIdMatchWithUserId()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            List<Order> orderList = new List<Order>();
            int mockClientId = 1;
            bool mockIsAdmin = true;
            mockRepo.Setup(repo => repo.GetOrders(mockClientId, mockIsAdmin)).ReturnsAsync(orderList);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.GetOrdersForList(mockClientId, mockIsAdmin);

            Assert.IsType<OkObjectResult>(res);
        }
        [Fact]
        public async Task GetFullOrder_ShouldReturnOkObject_IfClaimIdMatchWithUserId()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            List<Order> orderList = new List<Order>();
            Order o1 = new Order();
            int mockClientId = 1;
            int mockOrderId = 5;
            bool mockIsAdmin = true;
            List<Product> orderToBasket = new List<Product>{
                new Product(),
                new Product()
            };
            Client cp = new Client{
                Id = mockClientId
            };
            mockRepo.Setup(repo => repo.GetOrder(mockClientId, mockOrderId, mockIsAdmin)).ReturnsAsync(o1);
            mockRepo.Setup(repo => repo.GetOrderItems(mockOrderId)).ReturnsAsync(orderToBasket);
            mockRepo.Setup(repo => repo.GetCustomer(mockClientId)).ReturnsAsync(cp);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.GetFullOrder(mockClientId, mockOrderId, mockIsAdmin);

            Assert.IsType<OkObjectResult>(res);
        }

        [Fact]
        public async Task DeleteItemFromOrder_ShouldReturnNoContent_IfRemovalSucced()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            int mockClientId = 1;
            int mockOrderId = 1;
            int mockProductId = 1;
            mockRepo.Setup(repo => repo.DeleteOrderItemAsync(mockOrderId, mockProductId)).ReturnsAsync(true);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.DeleteItemFromOrder(mockOrderId, mockProductId, mockClientId);

            Assert.IsType<NoContentResult>(res);
        }
        [Fact]
        public async Task DeleteItemFromOrder_ShouldReturnBadRequest_IfRemovalNotSucced()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            int mockClientId = 1;
            int mockOrderId = 1;
            int mockProductId = 1;
            mockRepo.Setup(repo => repo.DeleteOrderItemAsync(mockOrderId, mockProductId)).ReturnsAsync(false);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.DeleteItemFromOrder(mockOrderId, mockProductId, mockClientId);

            Assert.IsType<BadRequestObjectResult>(res);
        }
        [Fact]
        public async Task RetrieveBasket_ShouldReturnOkObject_IfBasketNotExist()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            int mockClientId = 1;

            mockRepo.Setup(repo => repo.RetrieveBasket(mockClientId)).ReturnsAsync((Order)null);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.RetrieveBasket(mockClientId);

            Assert.IsType<OkObjectResult>(res); 
        }
        [Fact]
        public async Task RetrieveBasket_ShouldReturnOkObject_IfBasketExist()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();
            int mockClientId = 1;
            Order orderTemp = new Order();

            mockRepo.Setup(repo => repo.RetrieveBasket(mockClientId)).ReturnsAsync(orderTemp);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.RetrieveBasket(mockClientId);
            Assert.IsType<OkObjectResult>(res); 
        }
        [Fact]
        public async Task AddItemToOrder_ShouldReturnBadRequest_IfItemIsAlreadyInBasket()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();  
            int mockClientId = 1;
            int mockProductId = 1;

            List<OrderItem> itemsToOrder = new List<OrderItem>{
                new OrderItem(),
                new OrderItem()
            };
            mockRepo.Setup(repo => repo.BookOrderItemsAsync(itemsToOrder)).ReturnsAsync((List<OrderItem>)null);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.AddItemToOrder(mockClientId, mockProductId, itemsToOrder);

            Assert.IsType<BadRequestObjectResult>(res);
        }
        [Fact]
        public async Task AddItemToOrder_ShouldReturnOkObject_IfItemIsNotInBasket()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>();  
            int mockClientId = 1;
            int mockProductId = 1;

            List<OrderItem> itemsToOrder = new List<OrderItem>{
                new OrderItem(),
                new OrderItem()
            };
            mockRepo.Setup(repo => repo.BookOrderItemsAsync(itemsToOrder)).ReturnsAsync(itemsToOrder);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);

            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, "1")
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.AddItemToOrder(mockClientId, mockProductId, itemsToOrder);

            Assert.IsType<OkObjectResult>(res);
        }

        [Fact]
        public async Task ChangeStatusOfOrder_ShouldReturnUnathorized_IfUserIsNotAdmin()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>(); 
            int mockOrderId = 2;
            string newStatus = "NeverGonnaGiveYouUp";
            Client c1 = new Client{
                Id = 2,
                IsAdmin = false
            };
            mockRepo.Setup(repo => repo.GetCustomer(c1.Id)).ReturnsAsync(c1);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);
            
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, c1.Id.ToString())
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.ChangeStatusOfOrder(c1.Id, mockOrderId, newStatus);

            Assert.IsType<UnauthorizedResult>(res);
        }

        [Fact]
        public async Task ChangeStatusOfOrder_ShouldReturnOkObject_IfUserIsAdmin()
        {
            var mockRepo = new Mock<ICustomerRepository>();
            var mockMapper = new Mock<IMapper>(); 
            int mockOrderId = 2;
            string newStatus = "NeverGonnaGiveYouUp";
            Client c1 = new Client{
                Id = 2,
                IsAdmin = true
            };
            Order orderToRet = new Order{
                Id = mockOrderId,
                Status = newStatus
            };
            mockRepo.Setup(repo => repo.GetCustomer(c1.Id)).ReturnsAsync(c1);
            mockRepo.Setup(repo => repo.ChangeStatus(mockOrderId, newStatus)).ReturnsAsync(orderToRet);

            var controller = new OrdersController(mockRepo.Object, mockMapper.Object);
            
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]{
                new Claim (ClaimTypes.Name, "Just Name"),
                new Claim(ClaimTypes.NameIdentifier, c1.Id.ToString())
            }));

            controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext() {User = user}
            };

            var res = await controller.ChangeStatusOfOrder(c1.Id, mockOrderId, newStatus);

            Assert.IsType<OkObjectResult>(res);
        }
    }
}