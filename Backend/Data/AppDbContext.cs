using Microsoft.EntityFrameworkCore;

namespace Backend.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Municipio> Municipios { get; set; }
    public DbSet<Estado> Estados { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);

      modelBuilder.Entity<Municipio>()
          .HasOne(m => m.Estado)
          .WithMany()
          .HasForeignKey(m => m.IdEstado)
          .OnDelete(DeleteBehavior.Cascade);

      modelBuilder.Entity<Estado>()
          .HasKey(e => e.Id);

      modelBuilder.Entity<Municipio>()
          .HasKey(m => m.Id);
    }
  }
}