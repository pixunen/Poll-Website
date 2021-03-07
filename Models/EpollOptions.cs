using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EpollApi.Models
{
    public class EpollOptions
    {
        [Key]
        public int OptId { get; set; }
        public string Option { get; set; }
        public int Vote { get; set; }

        [ForeignKey("Epoll")]
        public int Id { get; set; }
        public virtual Epoll Epoll { get; set; }
    }
}