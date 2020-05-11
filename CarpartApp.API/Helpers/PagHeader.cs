namespace CarpartApp.API.Helpers
{
    public class PagHeader
    {
        public int CurrPage { get; set; }
        public int ItemsOnPage { get; set; }
        public int TotItems { get; set; }
        public int TotPages { get; set; }

        public PagHeader(int currPage, int itemsOnPage, int totItems, int totPages)
        {
            this.CurrPage = currPage;
            this.ItemsOnPage = itemsOnPage;
            this.TotItems = totItems;
            this.TotPages = totPages;
        }
    }
}