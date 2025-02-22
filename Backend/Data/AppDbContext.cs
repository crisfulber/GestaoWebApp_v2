using Backend.Models;
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
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Empresa> Empresas { get; set; }
        public DbSet<Contato> Contatos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Municipio>()
                .HasOne(m => m.Estado)
                .WithMany()
                .HasForeignKey(m => m.IdEstado)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<Endereco>()
                .HasOne(e => e.Municipio)
                .WithMany()
                .HasForeignKey(e => e.IdMunicipio)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Endereco>()
                .HasOne(e => e.Estado)
                .WithMany()
                .HasForeignKey(e => e.IdEstado)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Empresa>()
                .HasOne(e => e.Endereco)
                .WithMany()
                .HasForeignKey(e => e.IdEndereco)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Estado>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<Municipio>()
                .HasKey(m => m.Id);

            modelBuilder.Entity<Endereco>()
                .HasKey(m => m.Id);

            modelBuilder.Entity<Empresa>()
                .HasKey(e => e.Id);

            modelBuilder.Entity<Empresa>()
                .Property(e => e.CNPJ_CEI)
                .HasColumnType("varchar(18)");

            modelBuilder.Entity<Contato>()
                .Property(c => c.Telefone)
                .HasColumnType("varchar(16)")
                .IsRequired(false);

            modelBuilder.Entity<Contato>()
                .Property(c => c.Email)
                .IsRequired(false);

            modelBuilder.Entity<Empresa>()
                .HasOne(e => e.Contato)
                .WithMany()
                .HasForeignKey(e => e.IdContato)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}