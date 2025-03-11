using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class AddIdPessoaToSalario : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Funcoes_Setores_IdSetor",
                table: "Funcoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Setores_Unidade_IdUnidade",
                table: "Setores");

            migrationBuilder.DropIndex(
                name: "IX_Setores_IdUnidade",
                table: "Setores");

            migrationBuilder.DropColumn(
                name: "IdUnidade",
                table: "Setores");

            migrationBuilder.DropColumn(
                name: "UF_CTPS",
                table: "Documentos");

            migrationBuilder.DropColumn(
                name: "UF_RG",
                table: "Documentos");

            migrationBuilder.DropColumn(
                name: "CPF",
                table: "Dependentes");

            migrationBuilder.DropColumn(
                name: "IdConta",
                table: "DadosTrabalho");

            migrationBuilder.DropColumn(
                name: "IdFuncao",
                table: "DadosTrabalho");

            migrationBuilder.DropColumn(
                name: "IdSalario",
                table: "DadosTrabalho");

            migrationBuilder.RenameColumn(
                name: "Ativo",
                table: "Salarios",
                newName: "SalarioAtivo");

            migrationBuilder.RenameColumn(
                name: "DtNascimento",
                table: "Dependentes",
                newName: "DtNascimento_Dependente");

            migrationBuilder.AddColumn<int>(
                name: "IdPessoa",
                table: "Salarios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "PessoaId1",
                table: "Salarios",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "CEP",
                table: "Enderecos",
                type: "varchar(10)",
                maxLength: 10,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(9)",
                oldMaxLength: 9)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "RG",
                table: "Documentos",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "UF_CTPS_IdEstado",
                table: "Documentos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UF_RG_IdEstado",
                table: "Documentos",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CPF_Dependente",
                table: "Dependentes",
                type: "varchar(14)",
                maxLength: 14,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "IdEscolaridade",
                table: "DadosPessoais",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Periodos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Mes = table.Column<string>(type: "varchar(3)", maxLength: 3, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Ano = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Periodos", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Pessoas",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    NomePessoa = table.Column<string>(type: "LONGTEXT", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    IdDadosPessoais = table.Column<int>(type: "int", nullable: true),
                    IdDocumentos = table.Column<int>(type: "int", nullable: true),
                    IdDependentes = table.Column<int>(type: "int", nullable: true),
                    IdEnderecos = table.Column<int>(type: "int", nullable: true),
                    IdContatos = table.Column<int>(type: "int", nullable: true),
                    IdDadosTrabalho = table.Column<int>(type: "int", nullable: true),
                    IdFuncoes = table.Column<int>(type: "int", nullable: true),
                    IdSetores = table.Column<int>(type: "int", nullable: true),
                    IdUnidades = table.Column<int>(type: "int", nullable: true),
                    IdContas = table.Column<int>(type: "int", nullable: true),
                    IdSalarios = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pessoas", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Pessoas_Contas_IdContas",
                        column: x => x.IdContas,
                        principalTable: "Contas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Pessoas_Contatos_IdContatos",
                        column: x => x.IdContatos,
                        principalTable: "Contatos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Pessoas_DadosPessoais_IdDadosPessoais",
                        column: x => x.IdDadosPessoais,
                        principalTable: "DadosPessoais",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Pessoas_DadosTrabalho_IdDadosTrabalho",
                        column: x => x.IdDadosTrabalho,
                        principalTable: "DadosTrabalho",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Pessoas_Dependentes_IdDependentes",
                        column: x => x.IdDependentes,
                        principalTable: "Dependentes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Pessoas_Documentos_IdDocumentos",
                        column: x => x.IdDocumentos,
                        principalTable: "Documentos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Pessoas_Enderecos_IdEnderecos",
                        column: x => x.IdEnderecos,
                        principalTable: "Enderecos",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Pessoas_Funcoes_IdFuncoes",
                        column: x => x.IdFuncoes,
                        principalTable: "Funcoes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Pessoas_Salarios_IdSalarios",
                        column: x => x.IdSalarios,
                        principalTable: "Salarios",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.SetNull);
                    table.ForeignKey(
                        name: "FK_Pessoas_Setores_IdSetores",
                        column: x => x.IdSetores,
                        principalTable: "Setores",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Pessoas_Unidade_IdUnidades",
                        column: x => x.IdUnidades,
                        principalTable: "Unidade",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Salarios_IdPessoa",
                table: "Salarios",
                column: "IdPessoa");

            migrationBuilder.CreateIndex(
                name: "IX_Documentos_UF_CTPS_IdEstado",
                table: "Documentos",
                column: "UF_CTPS_IdEstado");

            migrationBuilder.CreateIndex(
                name: "IX_Documentos_UF_RG_IdEstado",
                table: "Documentos",
                column: "UF_RG_IdEstado");

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdContas",
                table: "Pessoas",
                column: "IdContas",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdContatos",
                table: "Pessoas",
                column: "IdContatos",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdDadosPessoais",
                table: "Pessoas",
                column: "IdDadosPessoais",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdDadosTrabalho",
                table: "Pessoas",
                column: "IdDadosTrabalho",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdDependentes",
                table: "Pessoas",
                column: "IdDependentes",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdDocumentos",
                table: "Pessoas",
                column: "IdDocumentos",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdEnderecos",
                table: "Pessoas",
                column: "IdEnderecos",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdFuncoes",
                table: "Pessoas",
                column: "IdFuncoes",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdSalarios",
                table: "Pessoas",
                column: "IdSalarios",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdSetores",
                table: "Pessoas",
                column: "IdSetores");

            migrationBuilder.CreateIndex(
                name: "IX_Pessoas_IdUnidades",
                table: "Pessoas",
                column: "IdUnidades");

            migrationBuilder.AddForeignKey(
                name: "FK_Documentos_Estados_UF_CTPS_IdEstado",
                table: "Documentos",
                column: "UF_CTPS_IdEstado",
                principalTable: "Estados",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Documentos_Estados_UF_RG_IdEstado",
                table: "Documentos",
                column: "UF_RG_IdEstado",
                principalTable: "Estados",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Funcoes_Setores_IdSetor",
                table: "Funcoes",
                column: "IdSetor",
                principalTable: "Setores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Salarios_Pessoas_IdPessoa",
                table: "Salarios",
                column: "IdPessoa",
                principalTable: "Pessoas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documentos_Estados_UF_CTPS_IdEstado",
                table: "Documentos");

            migrationBuilder.DropForeignKey(
                name: "FK_Documentos_Estados_UF_RG_IdEstado",
                table: "Documentos");

            migrationBuilder.DropForeignKey(
                name: "FK_Funcoes_Setores_IdSetor",
                table: "Funcoes");

            migrationBuilder.DropForeignKey(
                name: "FK_Salarios_Pessoas_IdPessoa",
                table: "Salarios");

            migrationBuilder.DropTable(
                name: "Periodos");

            migrationBuilder.DropTable(
                name: "Pessoas");

            migrationBuilder.DropIndex(
                name: "IX_Salarios_IdPessoa",
                table: "Salarios");

            migrationBuilder.DropIndex(
                name: "IX_Documentos_UF_CTPS_IdEstado",
                table: "Documentos");

            migrationBuilder.DropIndex(
                name: "IX_Documentos_UF_RG_IdEstado",
                table: "Documentos");

            migrationBuilder.DropColumn(
                name: "IdPessoa",
                table: "Salarios");

            migrationBuilder.DropColumn(
                name: "PessoaId1",
                table: "Salarios");

            migrationBuilder.DropColumn(
                name: "UF_CTPS_IdEstado",
                table: "Documentos");

            migrationBuilder.DropColumn(
                name: "UF_RG_IdEstado",
                table: "Documentos");

            migrationBuilder.DropColumn(
                name: "CPF_Dependente",
                table: "Dependentes");

            migrationBuilder.DropColumn(
                name: "IdEscolaridade",
                table: "DadosPessoais");

            migrationBuilder.RenameColumn(
                name: "SalarioAtivo",
                table: "Salarios",
                newName: "Ativo");

            migrationBuilder.RenameColumn(
                name: "DtNascimento_Dependente",
                table: "Dependentes",
                newName: "DtNascimento");

            migrationBuilder.AddColumn<int>(
                name: "IdUnidade",
                table: "Setores",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<string>(
                name: "CEP",
                table: "Enderecos",
                type: "varchar(9)",
                maxLength: 9,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(10)",
                oldMaxLength: 10)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<int>(
                name: "RG",
                table: "Documentos",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UF_CTPS",
                table: "Documentos",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "UF_RG",
                table: "Documentos",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "CPF",
                table: "Dependentes",
                type: "varchar(14)",
                maxLength: 14,
                nullable: false,
                defaultValue: "")
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<int>(
                name: "IdConta",
                table: "DadosTrabalho",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdFuncao",
                table: "DadosTrabalho",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdSalario",
                table: "DadosTrabalho",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Setores_IdUnidade",
                table: "Setores",
                column: "IdUnidade");

            migrationBuilder.AddForeignKey(
                name: "FK_Funcoes_Setores_IdSetor",
                table: "Funcoes",
                column: "IdSetor",
                principalTable: "Setores",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Setores_Unidade_IdUnidade",
                table: "Setores",
                column: "IdUnidade",
                principalTable: "Unidade",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
