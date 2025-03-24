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
        public DbSet<Documento> Documentos { get; set; }
        public DbSet<Nacionalidade> Nacionalidades { get; set; }
        public DbSet<EstadoCivil> EstadosCivis { get; set; }
        public DbSet<Dependente> Dependentes { get; set; }
        public DbSet<Banco> Bancos { get; set; }
        public DbSet<Conta> Contas { get; set; }
        public DbSet<DadosPessoais> DadosPessoais { get; set; }
        public DbSet<DadosTrabalho> DadosTrabalho { get; set; }
        public DbSet<Pessoa> Pessoas { get; set; }
        public DbSet<Salario> Salarios { get; set; }
        public DbSet<Periodo> Periodos { get; set; }
        public DbSet<Desconto> Descontos { get; set; }
        public DbSet<Adiantamento> Adiantamentos { get; set; }
        public DbSet<TipoHora> TiposHora { get; set; }
        public DbSet<HoraExtra> HorasExtras { get; set; }
        public DbSet<HoraFalta> HorasFaltas { get; set; }
        public DbSet<Acrescimo> Acrescimos { get; set; }

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

            modelBuilder.Entity<Conta>()
                .HasOne(cb => cb.Banco)
                .WithMany()
                .HasForeignKey(cb => cb.IdBanco)
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
                .HasColumnType("varchar(16)");

            modelBuilder.Entity<Contato>()
                .Property(c => c.Email);

            modelBuilder.Entity<Empresa>()
                .HasOne(e => e.Contato)
                .WithMany()
                .HasForeignKey(e => e.IdContato)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Pessoa>()
                .HasOne(p => p.DadosPessoais)
                .WithOne()
                .HasForeignKey<Pessoa>(p => p.IdDadosPessoais)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Pessoa>()
                .HasOne(p => p.Documento)
                .WithOne()
                .HasForeignKey<Pessoa>(p => p.IdDocumentos)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Pessoa>()
                .HasOne(p => p.Dependente)
                .WithOne()
                .HasForeignKey<Pessoa>(p => p.IdDependentes)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Pessoa>()
                .HasOne(p => p.Endereco)
                .WithOne()
                .HasForeignKey<Pessoa>(p => p.IdEnderecos)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Pessoa>()
                .HasOne(p => p.Contato)
                .WithOne()
                .HasForeignKey<Pessoa>(p => p.IdContatos)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Pessoa>()
                .HasOne(p => p.DadosTrabalho)
                .WithOne()
                .HasForeignKey<Pessoa>(p => p.IdDadosTrabalho)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Pessoa>()
                .HasOne(p => p.Funcao)
                .WithOne()
                .HasForeignKey<Pessoa>(p => p.IdFuncoes)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Pessoa>()
                .HasOne(p => p.Conta)
                .WithOne()
                .HasForeignKey<Pessoa>(p => p.IdContas)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Salario>()
              .HasOne(s => s.Pessoa)
              .WithMany()
              .HasForeignKey(s => s.IdPessoa)
              .OnDelete(DeleteBehavior.Restrict);
        }
    }
}