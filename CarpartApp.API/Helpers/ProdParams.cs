namespace CarpartApp.API.Helpers
{
    public class ProdParams
    {
        public int PageNo { get; set; } = 1;
        private const int MaxPageSize = 30;
        private int pageSize = 6;
        private string phrase = "";
        private string orderBy = "";
        public string Phrase 
        {
            get{return phrase;} 
            set{ phrase = (value == null) ? "" : value;}
        }
        public int PageSize
        {
            get { return pageSize;}
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value;}
        }
        public string OrderBy
        {
            get {return orderBy;}
            set { orderBy = (value == null) ? "" : value;}
        }

    }
}