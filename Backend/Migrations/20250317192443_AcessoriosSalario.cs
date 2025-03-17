using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AcessoriosSalario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Adiantamentos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdPessoa = table.Column<int>(type: "int", nullable: true),
                    Valor = table.Column<decimal>(type: "DECIMAL(6,2)", nullable: true),
                    Data = table.Column<DateTime>(type: "DATE", nullable: true),
                    Parcelas = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Adiantamentos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Adiantamentos_Pessoas_IdPessoa",
                        column: x => x.IdPessoa,
                        principalTable: "Pessoas",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Descontos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdPessoa = table.Column<int>(type: "int", nullable: true),
                    Valor = table.Column<decimal>(type: "DECIMAL(6,2)", nullable: true),
                    Data = table.Column<DateTime>(type: "DATE", nullable: true),
                    Parcelas = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Descontos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Descontos_Pessoas_IdPessoa",
                        column: x => x.IdPessoa,
                        principalTable: "Pessoas",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "TiposHora",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Descricao = table.Column<string>(type: "LONGTEXT", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Valor = table.Column<decimal>(type: "DECIMAL(2,1)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposHora", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "HorasExtras",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdPessoa = table.Column<int>(type: "int", nullable: true),
                    Data = table.Column<DateTime>(type: "DATE", nullable: true),
                    Horas = table.Column<decimal>(type: "DECIMAL(2,1)", nullable: true),
                    IdTipoHora = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HorasExtras", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HorasExtras_Pessoas_IdPessoa",
                        column: x => x.IdPessoa,
                        principalTable: "Pessoas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_HorasExtras_TiposHora_IdTipoHora",
                        column: x => x.IdTipoHora,
                        principalTable: "TiposHora",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "HorasFaltas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    IdPessoa = table.Column<int>(type: "int", nullable: true),
                    Data = table.Column<DateTime>(type: "DATE", nullable: true),
                    Horas = table.Column<decimal>(type: "DECIMAL(2,1)", nullable: true),
                    IdTipoHora = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HorasFaltas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_HorasFaltas_Pessoas_IdPessoa",
                        column: x => x.IdPessoa,
                        principalTable: "Pessoas",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_HorasFaltas_TiposHora_IdTipoHora",
                        column: x => x.IdTipoHora,
                        principalTable: "TiposHora",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Adiantamentos_IdPessoa",
                table: "Adiantamentos",
                column: "IdPessoa");

            migrationBuilder.CreateIndex(
                name: "IX_Descontos_IdPessoa",
                table: "Descontos",
                column: "IdPessoa");

            migrationBuilder.CreateIndex(
                name: "IX_HorasExtras_IdPessoa",
                table: "HorasExtras",
                column: "IdPessoa");

            migrationBuilder.CreateIndex(
                name: "IX_HorasExtras_IdTipoHora",
                table: "HorasExtras",
                column: "IdTipoHora");

            migrationBuilder.CreateIndex(
                name: "IX_HorasFaltas_IdPessoa",
                table: "HorasFaltas",
                column: "IdPessoa");

            migrationBuilder.CreateIndex(
                name: "IX_HorasFaltas_IdTipoHora",
                table: "HorasFaltas",
                column: "IdTipoHora");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Adiantamentos");

            migrationBuilder.DropTable(
                name: "Descontos");

            migrationBuilder.DropTable(
                name: "HorasExtras");

            migrationBuilder.DropTable(
                name: "HorasFaltas");

            migrationBuilder.DropTable(
                name: "TiposHora");
        }
    }
}
