# Arena Areia

Sistema de cadastro de usuários, quadras e reservas com Node.js, Express, EJS e MongoDB.

## Como executar

1. Instale o Node.js 22 LTS (recomendado).
2. Instale as dependências: `npm install`.
3. Confirme que o MongoDB está em execução em `mongodb://127.0.0.1:27017`.
4. Inicie o projeto: `npm start` (ou `node index.js`).
5. Abra `http://localhost:3001`.

O banco utilizado é `quadrascerto`. A conexão está configurada em `config/conexao.js`.

## Páginas

- `/` — página inicial
- `/site/quadras` — quadras cadastradas
- `/site/nova-reserva` — formulário de reserva
- `/site/reservas` — consulta por e-mail cadastrado
- `/usuario/lst`, `/quadra/lst`, `/reserva/lst` — telas de administração

As páginas usam EJS e o CSS principal está em `public/css/styleSite.css`.
# Areia-finais
