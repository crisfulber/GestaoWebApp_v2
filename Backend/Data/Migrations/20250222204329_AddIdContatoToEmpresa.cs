using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddIdContatoToEmpresa : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdContato",
                table: "Empresas",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Empresas_IdContato",
                table: "Empresas",
                column: "IdContato");

            migrationBuilder.AddForeignKey(
                name: "FK_Empresas_Contato_IdContato",
                table: "Empresas",
                column: "IdContato",
                principalTable: "Contato",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Empresas_Contato_IdContato",
                table: "Empresas");

            migrationBuilder.DropIndex(
                name: "IX_Empresas_IdContato",
                table: "Empresas");

            migrationBuilder.DropColumn(
                name: "IdContato",
                table: "Empresas");
        }
    }
}
