using Backend.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging; // Importa o namespace para o ILogger

var builder = WebApplication.CreateBuilder(args);

// Configuração do Logging
builder.Logging.ClearProviders(); // Remove os providers de log padrão
builder.Logging.AddConsole();    // Adiciona o console como um provider de log
builder.Logging.AddDebug();      // Adiciona o Debug como um provider de log
// Você pode adicionar outros providers aqui, como Serilog ou NLog

// Configuração do Banco de Dados
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"), ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
    ));

// Configuração do Controller e JSON (mantém os nomes das propriedades)
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNamingPolicy = null;
    });

// Adiciona o Swagger (opcional, mas útil para testar a API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configuração do Pipeline de Requisição HTTP
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage(); // Página de erro detalhada em desenvolvimento
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(options =>
    options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
);

app.UseRouting(); // Adiciona o middleware de roteamento

//app.UseAuthorization(); // Removido para simplificar e testar

app.MapControllers();

app.Run();