using System.Collections.Generic;
using System.Linq;
using CarpartApp.API.Models;
using Newtonsoft.Json;

namespace CarpartApp.API.Data
{
    public class Seed
    {
        public static void SeedProducts(DataContext context)
        {
            if(!context.Products.Any())
            {
                var prodData = System.IO.File.ReadAllText("Data/ProductSeedData.json");
                var products = JsonConvert.DeserializeObject<List<Product>>(prodData);

                foreach(var prod in products)
                {
                    context.Products.Add(prod);
                }

                context.SaveChanges();
            }

        }
    }
}