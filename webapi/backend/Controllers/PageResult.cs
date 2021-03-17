using System.Collections.Generic;

namespace backend.Controllers
{
    public class PageResult<T>
{
    public string Search{get;set;}
    public int Count { get; set; }
    public int PageIndex { get; set; }
    public int PageSize { get; set; }
    public List<T> Items { get; set; }
}
}