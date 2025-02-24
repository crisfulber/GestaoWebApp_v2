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
        public DbSet<Unidade> Unidades { get; set; }
        public DbSet<Setor> Setores { get; set; }
        public DbSet<Funcao> Funcoes { get; set; }
        public DbSet<FuncaoRegistro> FuncaoRegistros { get; set; }
        public DbSet<Escala> Escalas { get; set; }
        public DbSet<Escolaridade> Escolaridades { get; set; }

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

            modelBuilder.Entity<Unidade>() 
                .HasOne(u => u.Empresa)
                .WithMany()
                .HasForeignKey(u => u.IdEmpresa)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Unidade>()
                .HasOne(u => u.Endereco)
                .WithMany()
                .HasForeignKey(u => u.IdEndereco)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Setor>() 
                .HasOne(s => s.Unidade)
                .WithMany()
                .HasForeignKey(s => s.IdUnidade)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Funcao>() 
                .HasOne(f => f.Setor)
                .WithMany()
                .HasForeignKey(f => f.IdSetor)
                .OnDelete(DeleteBehavior.Restrict);

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