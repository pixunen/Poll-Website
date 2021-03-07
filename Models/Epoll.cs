using System.Collections.Generic;

namespace EpollApi.Models
{
    public class Epoll
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public virtual List<EpollOptions> Options { get; set; }
    }
    
}