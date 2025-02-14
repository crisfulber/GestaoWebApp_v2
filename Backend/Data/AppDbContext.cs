using Microsoft.EntityFrameworkCore;
 namespace Backend.Data
{
  public class AppDbContext : DbContext
  {
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
  
    }
    public DbSet<Empresa> Empresas { get; set; }
     public DbSet<Municipio> Municipios { get; set; }
     public DbSet<Estado> Estados { get; set; }
   }
}