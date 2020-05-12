using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace CarpartApp.API.Helpers
{
    //Paged list for products and orders(admin)
    public class PagList<T>: List<T>
    {
        public int CurrPage { get; set; }
        public int TotPages { get; set; }
        public int PageSize { get; set; }
        public int TotCount { get; set; }

        public PagList(List<T> items, int pageNo, int count, int pagSize)
        {
            TotCount = count;
            PageSize = pagSize;
            CurrPage = pageNo;
            TotPages = (int)Math.Ceiling(count / (double)pagSize);
            this.AddRange(items);
        }

        public static async Task<PagList<T>> CreateAsync(IQueryable<T> core, 
        int pageNo, int pagSize)
        {
            var count = await core.CountAsync();
            //var items = "";
            var items = await core.Skip((pageNo - 1) * pagSize).Take(pagSize).ToListAsync();
            return new PagList<T>(items, pageNo, count, pagSize);
        }

    }
}