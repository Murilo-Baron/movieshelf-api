🎬 MovieShelf API
API REST simples para gerenciar uma coleção pessoal de filmes, desenvolvida com Node.js, Express e MongoDB.
Projeto pensado para compor meu portfólio como Dev Jr, mostrando conhecimentos de backend, APIs REST e integração com banco de dados NoSQL.

✨ Funcionalidades
CRUD completo de filmes:
Criar filme
Listar todos os filmes
Buscar filme por ID
Atualizar filme
Remover filme
Campos do filme:
title – título do filme (obrigatório)
year – ano de lançamento (opcional)
rating – nota pessoal de 0 a 10 (opcional)
tags – array de tags, ex.: ["ação", "clássico"] (opcional)
Respostas em JSON
Tratamento básico de erros:
validação de dados (Mongoose)
ID inválido
erros internos de servidor
🧱 Stack utilizada
Node.js
Express – criação da API REST
MongoDB – banco de dados
Mongoose – ODM (modelagem dos dados)
Nodemon – reload automático em desenvolvimento
dotenv – gerenciamento de variáveis de ambiente
morgan – logs HTTP
cors – liberação de acesso para o frontend
📂 Estrutura do projeto
movieshelf-api/
  ├── package.json
  ├── .env
  └── src/
      ├── server.js
      ├── config/
      │   └── db.js          # conexão com o MongoDB
      ├── models/
      │   └── Movie.js       # schema do filme
      ├── routes/
      │   └── movieRoutes.js # rotas /api/movies
      └── middleware/
          └── errorHandler.js # tratamento de erros


🔧 Pré-requisitos

Node.js instalado (versão 18+ recomendada)

MongoDB:

pode ser local (mongod rodando), ou

uma instância no MongoDB Atlas

🚀 Como rodar o projeto

Clonar o repositório

git clone https://github.com/SEU-USUARIO/movieshelf-api.git
cd movieshelf-api


Instalar as dependências

npm install


Configurar o .env

Crie um arquivo .env na raiz do projeto:

PORT=4001
MONGODB_URI=mongodb://localhost:27017/movieshelf-api


Se estiver usando o MongoDB Atlas, basta trocar MONGODB_URI pela connection string do seu cluster.

Iniciar em modo desenvolvimento

npm run dev


Se tudo der certo, você verá no terminal:

✅ Conectado ao MongoDB
🚀 Servidor rodando na porta 4001


Testar a API

Rota de saúde (teste rápido):

GET http://localhost:4001/


Resposta:

{ "message": "MovieShelf API está rodando 🎬" }


Listar filmes:

GET http://localhost:4001/api/movies

📡 Endpoints

Base URL (desenvolvimento):

http://localhost:4001/api/movies

1. Listar todos os filmes

GET /api/movies

GET /api/movies


Resposta (200):

[
  {
    "_id": "6730f7b7d8...",
    "title": "Clube da Luta",
    "year": 1999,
    "rating": 10,
    "tags": ["ação", "clássico"],
    "createdAt": "2025-12-15T12:00:00.000Z",
    "updatedAt": "2025-12-15T12:00:00.000Z"
  }
]

2. Buscar filme por ID

GET /api/movies/:id

GET /api/movies/6730f7b7d8...


200 – filme encontrado

404 – ID válido, mas filme não encontrado

400 – ID inválido

3. Criar novo filme

POST /api/movies

POST /api/movies
Content-Type: application/json


Body exemplo:

{
  "title": "Clube da Luta",
  "year": 1999,
  "rating": 10,
  "tags": ["ação", "clássico", "favorito"]
}


Respostas:

201 – filme criado com sucesso

400 – erro de validação (ex.: sem título)

4. Atualizar filme

PATCH /api/movies/:id

PATCH /api/movies/6730f7b7d8...
Content-Type: application/json


Body exemplo:

{
  "rating": 9.5,
  "tags": ["drama", "cult"]
}


Respostas:

200 – filme atualizado

400 – erro de validação ou ID inválido

404 – filme não encontrado

5. Deletar filme

DELETE /api/movies/:id

DELETE /api/movies/6730f7b7d8...


Respostas:

204 – removido com sucesso (sem corpo)

404 – filme não encontrado

400 – ID inválido

🖥️ Frontend MovieShelf (opcional)

Criei também uma interface web chamada MovieShelf UI, com visual inspirado em serviços de streaming:

Consome esta API em http://localhost:4001/api/movies

Permite:

adicionar filmes,

listar em forma de catálogo (cards),

buscar por título,

ordenar por data, título, nota ou ano,

remover filmes.

Quando o repositório da UI estiver público, posso colocar o link aqui, por exemplo:

Frontend: https://github.com/SEU-USUARIO/movieshelf-ui

Demo: https://SEU-USUARIO.github.io/movieshelf-ui/

🧠 Próximos passos / ideias de melhoria

Integração com uma API pública de filmes (ex.: OMDb ou TMDB) para:

puxar poster, sinopse e nota IMDb automaticamente

Autenticação simples (ex.: JWT) para ter coleções por usuário

Paginação e filtros avançados no backend

Deploy do backend (Railway / Render) e integração com frontend publicado no GitHub Pages

👨‍💻 Autor

Desenvolvido por Murilo Baron.
Buscando oportunidades como Desenvolvedor Jr e construindo meu portfólio com projetos práticos em JavaScript, Node, MongoDB e front-end.
