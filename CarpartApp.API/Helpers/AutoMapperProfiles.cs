using AutoMapper;
using CarpartApp.API.Dtos;
using CarpartApp.API.Models;

namespace CarpartApp.API.Helpers
{
    public class AutoMapperProfiles: Profile
    {
        public AutoMapperProfiles()
        {
            //CreateMap<Client, >();
            CreateMap<ClientForRegisterDto, Client>();
            CreateMap<Client, ClientDetailedDto>();
            CreateMap<ClientDetailedDto, Client>();
            CreateMap<Order, OrderForListDto>();
            CreateMap<Product, ProductForOrderDto>();
            CreateMap<ProductForOrderDto, Product>();
            CreateMap<OrderForCreationDto, Order>();
        }
    }
}