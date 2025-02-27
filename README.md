# Projeto Laravel 11 + React (Vite) com Docker

## 📌 Requisitos

- Docker e Docker Compose instalados
- Chave da API do YouTube v3

## 🚀 Instalação e Configuração

### 🔹 Backend (Laravel 11)

Acesse a pasta do backend e suba os containers do Docker. Em seguida, execute as migrações e seeders e inicie o processamento de filas.
 ```sh
cd back
./vendor/bin/sail up -d
./vendor/bin/sail artisan migrate --seed
./vendor/bin/sail artisan queue:work
 ```
### 🔹 Frontend (React com Vite)

O frontend será iniciado automaticamente pelo Docker, sem necessidade de instalação manual de dependências ou execução de comandos adicionais.
.env
VITE_API_BASE_URL=http://localhost
VITE_YOUTUBE_API_KEY=sua_chave_aqui

## 🔑 Configuração da API do YouTube

No frontend, adicione a chave da API do YouTube v3 no arquivo `.env`.

## 🌐 Acessando a aplicação

- **Frontend:** http://localhost:5174
- **Mailpit (para testar e-mails):** http://localhost:8025

⚠️ O frontend não estará disponível em `http://localhost:5173`, apenas em `http://localhost:5174`.

## 🔑 Credenciais Padrão

Para acessar como administrador, utilize:

- **E-mail:** admin@admin.com
- **Senha:** admin

Você também pode registrar um novo usuário caso prefira.

## ✅ Executando os Testes Automatizados

Para rodar os testes automatizados, basta executar os testes no backend.

```sh
./vendor/bin/sail artisan test
 ```
Agora seu projeto está pronto para uso! 🚀

