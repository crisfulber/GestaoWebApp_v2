﻿// <auto-generated />
using System;
using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace Backend.Data.Migrations
{
    [DbContext(typeof(AppDbContext))]
    [Migration("20250226231400_ContaBancaria")]
    partial class ContaBancaria
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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

            modelBuilder.Entity("Backend.Models.ContaBancaria", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("Agencia")
                        .HasColumnType("int");

                    b.Property<int>("Conta")
                        .HasColumnType("int");

                    b.Property<int>("IdBanco")
                        .HasColumnType("int");

                    b.Property<string>("PIX")
                        .HasColumnType("LONGTEXT");

                    b.HasKey("Id");

                    b.HasIndex("IdBanco");

                    b.ToTable("ContasBancarias");
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

            modelBuilder.Entity("Backend.Models.Dependente", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("CPF")
                        .IsRequired()
                        .HasMaxLength(14)
                        .HasColumnType("varchar(14)");

                    b.Property<DateTime?>("DtNascimento")
                        .HasColumnType("datetime(6)");

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
                        .IsRequired()
                        .HasMaxLength(14)
                        .HasColumnType("varchar(14)");

                    b.Property<int?>("CTPS")
                        .HasColumnType("int");

                    b.Property<DateTime?>("DtEmissaoCTPS")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime?>("DtEmissaoRG")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("OrgaoExpeditor")
                        .HasColumnType("longtext");

                    b.Property<string>("PIS")
                        .HasMaxLength(14)
                        .HasColumnType("varchar(14)");

                    b.Property<int>("RG")
                        .HasColumnType("int");

                    b.Property<int?>("SerieCTPS")
                        .HasColumnType("int");

                    b.Property<string>("UF_CTPS")
                        .HasColumnType("longtext");

                    b.Property<string>("UF_RG")
                        .HasColumnType("longtext");

                    b.HasKey("Id");

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
                        .HasMaxLength(9)
                        .HasColumnType("varchar(9)");

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

            modelBuilder.Entity("Backend.Models.Setor", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    MySqlPropertyBuilderExtensions.UseMySqlIdentityColumn(b.Property<int>("Id"));

                    b.Property<int>("IdUnidade")
                        .HasColumnType("int");

                    b.Property<string>("NomeSetor")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("IdUnidade");

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

            modelBuilder.Entity("Backend.Models.ContaBancaria", b =>
                {
                    b.HasOne("Backend.Models.Banco", "Banco")
                        .WithMany()
                        .HasForeignKey("IdBanco")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Banco");
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
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Setor");
                });

            modelBuilder.Entity("Backend.Models.Setor", b =>
                {
                    b.HasOne("Backend.Models.Unidade", "Unidade")
                        .WithMany()
                        .HasForeignKey("IdUnidade")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Unidade");
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
