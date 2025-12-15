# 🎬 MovieShelf API

API REST simples para gerenciar uma coleção pessoal de filmes, construída com **Node.js + Express + MongoDB**.  
Projeto focado em portfólio, para demonstrar conhecimentos de **backend**, **APIs REST** e **persistência com Mongoose**.

---

## 📌 Visão geral

A MovieShelf API permite:

- Cadastrar filmes
- Listar todos os filmes
- Buscar filme por ID
- Atualizar dados de um filme
- Remover filmes

Cada filme possui:

- `title` – título (obrigatório)
- `year` – ano de lançamento (opcional)
- `rating` – nota pessoal de 0 a 10 (opcional)
- `tags` – lista de tags, ex.: `["ação", "clássico"]` (opcional)

Todas as respostas são em **JSON**.

---

## 🧱 Tecnologias utilizadas

- **Node.js**
- **Express** (roteamento e estrutura da API)
- **MongoDB** (banco de dados NoSQL)
- **Mongoose** (modelagem e validação)
- **dotenv** (variáveis de ambiente)
- **morgan** (logs HTTP em desenvolvimento)
- **cors** (liberação de acesso para o frontend)
- **nodemon** (reload automático em desenvolvimento)

---

## 📂 Estrutura do projeto

```bash
movieshelf-api/
  ├── package.json
  ├── .env
  └── src/
      ├── server.js          # inicialização do servidor Express
      ├── config/
      │   └── db.js          # conexão com o MongoDB
      ├── models/
      │   └── Movie.js       # schema/model de Filme
      ├── routes/
      │   └── movieRoutes.js # rotas /api/movies
      └── middleware/
          └── errorHandler.js # middleware de tratamento de erros
