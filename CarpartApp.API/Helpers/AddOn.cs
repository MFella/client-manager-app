using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CarpartApp.API.Helpers
{
    public static class AddOn
    {
        public static void AddApplicationError(this HttpResponse resp, string mess)
        {
            resp.Headers.Add("Application-Error", mess);
            resp.Headers.Add("Application-Control-Expose-Headers", "Application-Error");
            resp.Headers.Add("Application-Control-Allow-Origin", "*");
        }

        public static void AddPag(this HttpResponse resp, int currPage, int itemsOnPage,
        int totItems, int totPages)
        {
            var pagHeader = new PagHeader(currPage, itemsOnPage, totItems, totPages);
            var camelFormatter = new JsonSerializerSettings();
            camelFormatter.ContractResolver = new CamelCasePropertyNamesContractResolver();
            resp.Headers.Add("Pagination", JsonConvert
            .SerializeObject(pagHeader, camelFormatter));
            resp.Headers.Add("Access-Control-Expose-Headers", "Pagination");
        }
    }
}