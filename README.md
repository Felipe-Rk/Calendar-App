Calendar App

Descrição

O Calendar App é um sistema web para gerenciamento de eventos e compromissos. Ele permite aos usuários criar, editar e excluir eventos, oferecendo uma interface intuitiva para organização de calendários.

Funcionalidades

Cadastro de eventos com título, descrição, data e hora.

Visualização dos eventos por dia, semana ou mês.

Autenticação e autorização de usuários.

Integração com banco de dados relacional.

API RESTful para manipulação dos eventos.

Tecnologias Utilizadas

Frontend: Angular 2+

Backend: Node.js com NestJS

Banco de Dados: PostgreSQL

Autenticação: JWT

Infraestrutura: Docker e AWS (diferencial)

Requisitos

Node.js 18+

Docker

PostgreSQL

Angular CLI

Instalação e Configuração

Clone o repositório:

git clone https://github.com/Felipe-Rk/Calendar-App.git
cd Calendar-App

Configure o Backend:

cd backend
npm install
cp .env.example .env
npm run start:dev

Configure o Frontend:

cd ../frontend
npm install
npm start

Uso

Acesse o frontend no navegador: http://localhost:4200

Faça login ou registre-se.

Adicione eventos ao seu calendário.

API Endpoints

POST /auth/login - Login de usuário.

POST /auth/register - Registro de usuário.

GET /events - Lista eventos do usuário.

POST /events - Cria um evento.

PUT /events/:id - Atualiza um evento.

DELETE /events/:id - Remove um evento.

Testes

Para rodar os testes:

npm run test

Contribuição

Fork o repositório

Crie uma branch (feature/nova-feature)

Commit suas mudanças

Envie um Pull Request

Licença

Este projeto está sob a licença MIT.

