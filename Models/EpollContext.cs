using System; 
using Microsoft.EntityFrameworkCore; 
using Microsoft.EntityFrameworkCore.Metadata;

namespace EpollApi.Models
{
    public class EpollContext : DbContext
    {
        public EpollContext(DbContextOptions<EpollContext> options) : base(options)
        {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Epoll>(entity =>
            {
                entity.Property(e => e.Id).HasColumnName("ID");
 
                entity.Property(e => e.Title).HasMaxLength(300);
            });
 
            modelBuilder.Entity<EpollOptions>(entity =>
            {
                entity.Property(e => e.OptId).HasColumnName("OptID");
 
                entity.Property(e => e.Option)
                    .IsRequired()
                    .HasMaxLength(200);
 
                entity.Property(e => e.Id).HasColumnName("ID");
 
                entity.HasOne(d => d.Epoll)
                    .WithMany(p => p.Options)
                    .HasForeignKey(d => d.Id)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_PollOption_PollOption");
            });
        }
        public DbSet<Epoll> Polls { get; set; }
        public DbSet<EpollOptions> EpollOptions { get; set; }

    }
}