using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class UpdatePessoaModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Pessoas_Salarios_IdSalarios",
                table: "Pessoas");

            migrationBuilder.DropForeignKey(
                name: "FK_Salarios_Pessoas_IdPessoa",
                table: "Salarios");

            migrationBuilder.DropIndex(
                name: "IX_Pessoas_IdSalarios",
                table: "Pessoas");

            migrationBuilder.DropColumn(
                name: "PessoaId1",
                table: "Salarios");

            migrationBuilder.DropColumn(
                name: "IdSalarios",
                table: "Pessoas");

            migrationBuilder.AddForeignKey(
                name: "FK_Salarios_Pessoas_IdPessoa",
                table: "Salarios",
                column: "IdPessoa",
                principalTable: "Pessoas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Salarios_Pessoas_IdPessoa",
                table: "Salarios");

            migrationBuilder.AddColumn<int>(
                name: "PessoaId1",
                table: "Salarios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdSalarios",
                table: "Pessoas",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdSalarios",
                table: "Pessoas",
                column: "IdSalarios",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Pessoas_Salarios_IdSalarios",
                table: "Pessoas",
                column: "IdSalarios",
                principalTable: "Salarios",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);

            migrationBuilder.AddForeignKey(
                name: "FK_Salarios_Pessoas_IdPessoa",
                table: "Salarios",
                column: "IdPessoa",
                principalTable: "Pessoas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
