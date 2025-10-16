# 🛒 Lista de Compras — Projeto Fullstack (Next.js + NestJS + PostgreSQL)

Aplicação completa de **Lista de Compras**, composta por:

- 🖥️ **Frontend** — Next.js + Tailwind CSS  
- ⚙️ **Backend** — NestJS + Prisma + PostgreSQL  
- 📱 (Opcional) **Mobile** — Expo / React Native

---

## 🚀 Como rodar o projeto localmente

### 🧩 Pré-requisitos
- Node.js (v18 ou superior)
- npm (v9 ou superior)
- PostgreSQL (v13 ou superior)
- Git instalado

---

## 🗄️ 1. Banco de Dados (PostgreSQL)

### Crie o banco local:
Abra o **psql** ou um gerenciador (como DBeaver ou Beekeeper) e rode:

```sql
CREATE DATABASE compras;
```

### Configure o arquivo `.env` no backend:
Crie um arquivo `.env` dentro da pasta `api/` com o conteúdo:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/compras"
PORT=3001
```

---

## ⚙️ 2. Backend (NestJS)

### Instalar dependências:
```bash
cd api
npm install
```

### Rodar as migrations do Prisma:
```bash
npx prisma migrate dev
```

### Subir o servidor:
```bash
npm run start:dev
```
O backend estará disponível em **http://localhost:3001**

---

## 💻 3. Frontend (Next.js)

### Configurar variáveis de ambiente
Crie o arquivo `.env.local` dentro de `web/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Instalar dependências:
```bash
cd web
npm install
```

### Rodar o frontend:
```bash
npm run dev
```
Acesse o app em **http://localhost:3000**

---

## 🧰 Estrutura geral

```
compras-api/
├── api/              # Backend NestJS
│   ├── src/
│   ├── prisma/
│   └── .env
├── web/              # Frontend Next.js
│   ├── src/
│   └── .env.local
└── mobile/ (opcional)
```

---

## 🧪 Testar o fluxo completo

1. Suba o PostgreSQL localmente.  
2. Rode `npm run start:dev` na pasta `api/`.  
3. Rode `npm run dev` na pasta `web/`.  
4. Abra [http://localhost:3000](http://localhost:3000).  
5. Adicione um item, selecione uma categoria e salve.  
6. O item aparecerá na lista, persistido no banco via API.

---

## 🧠 Tecnologias principais

### Backend
- NestJS
- Prisma ORM
- PostgreSQL

### Frontend
- Next.js
- React + TypeScript
- Tailwind CSS

---

## 🗃️ Comandos úteis

### Backend
```bash
npm run start:dev     # Modo desenvolvimento
npm run build         # Compila para produção
npm run start:prod    # Roda versão compilada
```

### Frontend
```bash
npm run dev           # Desenvolvimento
npm run build         # Build de produção
npm start             # Servir build
```

---

## 🧩 Conexão com o banco de dados

Para conectar o **Prisma** ao PostgreSQL local, o backend usa a variável:

```
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

Exemplo padrão (caso use o PostgreSQL padrão local):

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/compras"
```

Após configurar:
```bash
npx prisma migrate dev
npx prisma studio   # Abre painel gráfico para visualizar as tabelas
```

---

## 📄 Licença
Este projeto é livre para fins de estudo e pode ser usado ou adaptado.

---

Desenvolvido por [Marlene Carvalho](https://github.com/marlenecarvalho) 🚀
