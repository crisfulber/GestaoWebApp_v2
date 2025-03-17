﻿// <auto-generated />
using System;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.2")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            MySqlModelBuilderExtensions.AutoIncrementColumns(modelBuilder);

            modelBuilder.Entity("Backend.Models.Banco", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Codigo")
                        .HasColumnType("int");

                    b.Property<string>("NomeBanco")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Bancos");
                });

            modelBuilder.Entity("Backend.Models.Conta", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Agencia")
                        .HasColumnType("longtext");

                    b.Property<int?>("IdBanco")
                        .HasColumnType("int");

                    b.Property<string>("NumConta")
                        .HasColumnType("longtext");

                    b.Property<string>("PIX")
                        .HasColumnType("LONGTEXT");

                    b.HasKey("Id");

                    b.HasIndex("IdBanco");

                    b.ToTable("Contas");
                });

            modelBuilder.Entity("Backend.Models.Contato", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .HasColumnType("longtext");

                    b.Property<string>("Telefone")
                        .HasMaxLength(16)
                        .HasColumnType("varchar(16)");

                    b.HasKey("Id");

                    b.ToTable("Contatos");
                });

            modelBuilder.Entity("Backend.Models.DadosPessoais", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("DtNascimento")
                        .IsRequired()
                        .HasColumnType("LONGTEXT");

                    b.Property<int?>("IdEscolaridade")
                        .HasColumnType("int");

                    b.Property<int?>("IdEstadoCivil")
                        .HasColumnType("int");

                    b.Property<int?>("IdMunicipio")
                        .HasColumnType("int");

                    b.Property<int?>("IdNacionalidade")
                        .HasColumnType("int");

                    b.Property<string>("NomeConjuge")
                        .HasColumnType("LONGTEXT");

                    b.Property<string>("NomeMae")
                        .HasColumnType("LONGTEXT");

                    b.Property<string>("NomePai")
                        .HasColumnType("LONGTEXT");

                    b.HasKey("Id");

                    b.ToTable("DadosPessoais");
                });

            modelBuilder.Entity("Backend.Models.DadosTrabalho", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<bool>("Adiantamento")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Almoco")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Ativo")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("Bonifica")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("DtInicio")
                        .IsRequired()
                        .HasColumnType("LONGTEXT");

                    b.Property<string>("DtRegistro")
                        .HasColumnType("LONGTEXT");

                    b.Property<string>("NumRegistro")
                        .HasColumnType("LONGTEXT");

                    b.Property<bool>("ValeTransporte")
                        .HasColumnType("tinyint(1)");

                    b.HasKey("Id");

                    b.ToTable("DadosTrabalho");
                });

            modelBuilder.Entity("Backend.Models.Dependente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CPF_Dependente")
                        .HasMaxLength(14)
                        .HasColumnType("varchar(14)");

                    b.Property<string>("DtNascimento_Dependente")
                        .HasColumnType("longtext");

                    b.Property<string>("NomeDependente")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Dependentes");
                });

            modelBuilder.Entity("Backend.Models.Documento", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CPF")
                        .HasMaxLength(14)
                        .HasColumnType("varchar(14)");

                    b.Property<string>("CTPS")
                        .HasColumnType("longtext");

                    b.Property<string>("DtEmissaoCTPS")
                        .HasColumnType("longtext");

                    b.Property<string>("DtEmissaoRG")
                        .HasColumnType("longtext");

                    b.Property<string>("OrgaoExpeditor")
                        .HasColumnType("longtext");

                    b.Property<string>("PIS")
                        .HasMaxLength(14)
                        .HasColumnType("varchar(14)");

                    b.Property<string>("RG")
                        .HasColumnType("longtext");

                    b.Property<string>("SerieCTPS")
                        .HasColumnType("longtext");

                    b.Property<int?>("UF_CTPS_IdEstado")
                        .HasColumnType("int");

                    b.Property<int?>("UF_RG_IdEstado")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("UF_CTPS_IdEstado");

                    b.HasIndex("UF_RG_IdEstado");

                    b.ToTable("Documentos");
                });

            modelBuilder.Entity("Backend.Models.Empresa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CNPJ_CEI")
                        .IsRequired()
                        .HasMaxLength(18)
                        .HasColumnType("varchar(18)");

                    b.Property<int?>("IdContato")
                        .HasColumnType("int");

                    b.Property<int?>("IdEndereco")
                        .HasColumnType("int");

                    b.Property<string>("NomeEmpresa")
                        .IsRequired()
                        .HasMaxLength(80)
                        .HasColumnType("varchar(80)");

                    b.HasKey("Id");

                    b.HasIndex("IdContato");

                    b.HasIndex("IdEndereco");

                    b.ToTable("Empresas");
                });

            modelBuilder.Entity("Backend.Models.Endereco", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Bairro")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<string>("CEP")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("varchar(10)");

                    b.Property<string>("Complemento")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<int>("IdEstado")
                        .HasColumnType("int");

                    b.Property<int>("IdMunicipio")
                        .HasColumnType("int");

                    b.Property<int>("Numero")
                        .HasColumnType("int");

                    b.Property<string>("Rua")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("varchar(100)");

                    b.HasKey("Id");

                    b.HasIndex("IdEstado");

                    b.HasIndex("IdMunicipio");

                    b.ToTable("Enderecos");
                });

            modelBuilder.Entity("Backend.Models.Escala", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("Descricao")
                        .HasColumnType("longtext");

                    b.Property<string>("NomeEscala")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Escala");
                });

            modelBuilder.Entity("Backend.Models.Escolaridade", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("NomeEscolaridade")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Escolaridade");
                });

            modelBuilder.Entity("Backend.Models.EstadoCivil", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("SituacaoCivil")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("EstadoCivil");
                });

            modelBuilder.Entity("Backend.Models.Funcao", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IdSetor")
                        .HasColumnType("int");

                    b.Property<string>("NomeFuncao")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("IdSetor");

                    b.ToTable("Funcoes");
                });

            modelBuilder.Entity("Backend.Models.FuncaoRegistro", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("CBO")
                        .HasColumnType("int");

                    b.Property<string>("Funcao")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("FuncaoRegistro");
                });

            modelBuilder.Entity("Backend.Models.Nacionalidade", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("NomeNacionalidade")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Nacionalidade");
                });

            modelBuilder.Entity("Backend.Models.Periodo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Ano")
                        .HasColumnType("int");

                    b.Property<string>("Mes")
                        .IsRequired()
                        .HasMaxLength(3)
                        .HasColumnType("varchar(3)");

                    b.HasKey("Id");

                    b.ToTable("Periodos");
                });

            modelBuilder.Entity("Backend.Models.Pessoa", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int?>("IdContas")
                        .HasColumnType("int");

                    b.Property<int?>("IdContatos")
                        .HasColumnType("int");

                    b.Property<int?>("IdDadosPessoais")
                        .HasColumnType("int");

                    b.Property<int?>("IdDadosTrabalho")
                        .HasColumnType("int");

                    b.Property<int?>("IdDependentes")
                        .HasColumnType("int");

                    b.Property<int?>("IdDocumentos")
                        .HasColumnType("int");

                    b.Property<int?>("IdEnderecos")
                        .HasColumnType("int");

                    b.Property<int?>("IdFuncoes")
                        .HasColumnType("int");

                    b.Property<int?>("IdSetores")
                        .HasColumnType("int");

                    b.Property<int?>("IdUnidades")
                        .HasColumnType("int");

                    b.Property<string>("NomePessoa")
                        .HasColumnType("LONGTEXT");

                    b.HasKey("Id");

                    b.HasIndex("IdContas")
                        .IsUnique();

                    b.HasIndex("IdContatos")
                        .IsUnique();

                    b.HasIndex("IdDadosPessoais")
                        .IsUnique();

                    b.HasIndex("IdDadosTrabalho")
                        .IsUnique();

                    b.HasIndex("IdDependentes")
                        .IsUnique();

                    b.HasIndex("IdDocumentos")
                        .IsUnique();

                    b.HasIndex("IdEnderecos")
                        .IsUnique();

                    b.HasIndex("IdFuncoes")
                        .IsUnique();

                    b.HasIndex("IdSetores");

                    b.HasIndex("IdUnidades");

                    b.ToTable("Pessoas");
                });

            modelBuilder.Entity("Backend.Models.Salario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("DtAlteracao")
                        .HasColumnType("DATE");

                    b.Property<int>("IdPessoa")
                        .HasColumnType("int");

                    b.Property<bool>("SalarioAtivo")
                        .HasColumnType("tinyint(1)");

                    b.Property<decimal>("Valor")
                        .HasColumnType("DECIMAL(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("IdPessoa");

                    b.ToTable("Salarios");
                });

            modelBuilder.Entity("Backend.Models.Setor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("NomeSetor")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Setores");
                });

            modelBuilder.Entity("Backend.Models.Unidade", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IdEmpresa")
                        .HasColumnType("int");

                    b.Property<int>("IdEndereco")
                        .HasColumnType("int");

                    b.Property<string>("NomeUnidade")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("IdEmpresa");

                    b.HasIndex("IdEndereco");

                    b.ToTable("Unidade");
                });

            modelBuilder.Entity("Estado", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("NomeEstado")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Sigla")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Estados");
                });

            modelBuilder.Entity("Municipio", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IdEstado")
                        .HasColumnType("int");

                    b.Property<string>("NomeMunicipio")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("IdEstado");

                    b.ToTable("Municipios");
                });

            modelBuilder.Entity("Backend.Models.Conta", b =>
                {
                    b.HasOne("Backend.Models.Banco", "Banco")
                        .WithMany()
                        .HasForeignKey("IdBanco")
                        .OnDelete(DeleteBehavior.Restrict);

                    b.Navigation("Banco");
                });

            modelBuilder.Entity("Backend.Models.Documento", b =>
                {
                    b.HasOne("Estado", "UF_CTPS_Estado")
                        .WithMany()
                        .HasForeignKey("UF_CTPS_IdEstado");

                    b.HasOne("Estado", "UF_RG_Estado")
                        .WithMany()
                        .HasForeignKey("UF_RG_IdEstado");

                    b.Navigation("UF_CTPS_Estado");

                    b.Navigation("UF_RG_Estado");
                });

            modelBuilder.Entity("Backend.Models.Empresa", b =>
                {
                    b.HasOne("Backend.Models.Contato", "Contato")
                        .WithMany()
                        .HasForeignKey("IdContato")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Backend.Models.Endereco", "Endereco")
                        .WithMany()
                        .HasForeignKey("IdEndereco")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.Navigation("Contato");

                    b.Navigation("Endereco");
                });

            modelBuilder.Entity("Backend.Models.Endereco", b =>
                {
                    b.HasOne("Estado", "Estado")
                        .WithMany()
                        .HasForeignKey("IdEstado")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Municipio", "Municipio")
                        .WithMany()
                        .HasForeignKey("IdMunicipio")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Estado");

                    b.Navigation("Municipio");
                });

            modelBuilder.Entity("Backend.Models.Funcao", b =>
                {
                    b.HasOne("Backend.Models.Setor", "Setor")
                        .WithMany()
                        .HasForeignKey("IdSetor")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Setor");
                });

            modelBuilder.Entity("Backend.Models.Pessoa", b =>
                {
                    b.HasOne("Backend.Models.Conta", "Conta")
                        .WithOne()
                        .HasForeignKey("Backend.Models.Pessoa", "IdContas")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Backend.Models.Contato", "Contato")
                        .WithOne()
                        .HasForeignKey("Backend.Models.Pessoa", "IdContatos")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Backend.Models.DadosPessoais", "DadosPessoais")
                        .WithOne()
                        .HasForeignKey("Backend.Models.Pessoa", "IdDadosPessoais")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Backend.Models.DadosTrabalho", "DadosTrabalho")
                        .WithOne()
                        .HasForeignKey("Backend.Models.Pessoa", "IdDadosTrabalho")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Backend.Models.Dependente", "Dependente")
                        .WithOne()
                        .HasForeignKey("Backend.Models.Pessoa", "IdDependentes")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Backend.Models.Documento", "Documento")
                        .WithOne()
                        .HasForeignKey("Backend.Models.Pessoa", "IdDocumentos")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Backend.Models.Endereco", "Endereco")
                        .WithOne()
                        .HasForeignKey("Backend.Models.Pessoa", "IdEnderecos")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Backend.Models.Funcao", "Funcao")
                        .WithOne()
                        .HasForeignKey("Backend.Models.Pessoa", "IdFuncoes")
                        .OnDelete(DeleteBehavior.SetNull);

                    b.HasOne("Backend.Models.Setor", "Setor")
                        .WithMany()
                        .HasForeignKey("IdSetores");

                    b.HasOne("Backend.Models.Unidade", "Unidade")
                        .WithMany()
                        .HasForeignKey("IdUnidades");

                    b.Navigation("Conta");

                    b.Navigation("Contato");

                    b.Navigation("DadosPessoais");

                    b.Navigation("DadosTrabalho");

                    b.Navigation("Dependente");

                    b.Navigation("Documento");

                    b.Navigation("Endereco");

                    b.Navigation("Funcao");

                    b.Navigation("Setor");

                    b.Navigation("Unidade");
                });

            modelBuilder.Entity("Backend.Models.Salario", b =>
                {
                    b.HasOne("Backend.Models.Pessoa", "Pessoa")
                        .WithMany()
                        .HasForeignKey("IdPessoa")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Pessoa");
                });

            modelBuilder.Entity("Backend.Models.Unidade", b =>
                {
                    b.HasOne("Backend.Models.Empresa", "Empresa")
                        .WithMany()
                        .HasForeignKey("IdEmpresa")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("Backend.Models.Endereco", "Endereco")
                        .WithMany()
                        .HasForeignKey("IdEndereco")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Empresa");

                    b.Navigation("Endereco");
                });

            modelBuilder.Entity("Municipio", b =>
                {
                    b.HasOne("Estado", "Estado")
                        .WithMany()
                        .HasForeignKey("IdEstado")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Estado");
                });
#pragma warning restore 612, 618
        }
    }
}
