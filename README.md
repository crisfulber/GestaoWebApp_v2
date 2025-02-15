# Gestão WebApp

## Descrição

Este projeto é um web app desenvolvido para auxiliar na gestão da empresa. Inicialmente, o foco é a gestão de pessoas, mas a arquitetura foi pensada para ser escalável e acomodar outras necessidades da empresa no futuro.

## Funcionalidades Principais (Em Desenvolvimento)

*   **Gestão de Pessoas:** 
    *   Cadastro de funcionários: Interface básica implementada, sem validações completas.
    *   Controle de ponto: (planejado).
    *   Gestão de folha de pagamento: Em desenvolvimento.
    *   Avaliação de desempenho: Em desenvolvimento.

## Tecnologias Utilizadas

*   **Frontend:**
    *   Angular 19
    *   PrimeNG 19
    *   TypeScript
*   **Backend:**
    *   .NET 8 (API Web)
    *   C#
*   **Banco de Dados:** 
    *   SQL Server

## Pré-requisitos

*   **Node.js:** Versão 22.11.0
*   **.NET SDK:** Versão 8.0
*   **Angular CLI:** Versão 19.1.5
*   **Git:** [https://github.com/crisfulber/GestaoWebApp_v2](https://github.com/crisfulber/GestaoWebApp_v2)

## Como Rodar o Projeto

### Backend (.NET)

1.  Navegue até o diretório `Backend`.
2.  Restaure as dependências: `dotnet restore`
3.  Execute a aplicação: `dotnet run`
4.  A API estará disponível em: `(http://localhost:5243/api)`

### Frontend (Angular)

1.  Navegue até o diretório `Frontend`.
2.  Instale as dependências: `npm install` (ou `yarn install`)
3.  Inicie o servidor de desenvolvimento: `ng serve` (ou `yarn start`)
4.  A aplicação estará disponível em: `http://localhost:4200`

## Próximos Passos

*   Implementar a funcionalidade de cadastro de colaboradores no módulo de gestão de pessoas.
*   Adicionar testes unitários para o controller colaborador do backend.
*   Melhorar o tema da aplicação.

## Licença

MIT License

## Status do Projeto

O projeto se encontra em fase inicial de desenvolvimento. A maior parte das funcionalidades ainda não está totalmente implementada e pronta para testes, mas algumas partes podem estar em um estado inicial.