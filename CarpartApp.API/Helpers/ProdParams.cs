namespace CarpartApp.API.Helpers
{
    public class ProdParams
    {
        public int PageNo { get; set; } = 1;
        private const int MaxPageSize = 30;
        private int pageSize = 6;
        
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }
    }
}