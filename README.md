#  MyFinance

**MyFinance** é um painel de controle financeiro pessoal construído com **Laravel** no backend e **React + Bootstrap** no frontend. Ele permite o gerenciamento de receitas e despesas com categorização, filtros dinâmicos e visualização gráfica mensal.

---

## Funcionalidades

- Autenticação de usuários (JWT)
- Cadastro de receitas e despesas
- Filtros por data, valor e categoria
- Edição e exclusão de lançamentos
- Dashboard com:
  - Saldo total
  - Total de receitas e despesas
  - Gráfico de barras por mês
  - Gráficos de pizza por categoria
- Tela de perfil com atualização de nome e senha
- Interface 100% responsiva

---

## Tecnologias

### Backend – Laravel (API RESTful)
- Laravel 10
- Laravel Breeze (API mode)
- JWT Auth (`tymon/jwt-auth`)
- MySQL
- Validações, filtros dinâmicos e controladores organizados

### Frontend – React
- React 18 com Vite
- Bootstrap 5
- React Router DOM
- Axios para chamadas à API
- Chart.js para gráficos dinâmicos

---

## Como rodar localmente

### Pré-requisitos

- Node.js e npm
- PHP 8.1+
- Composer
- MySQL
- Laravel instalado globalmente (opcional)

---

###  Backend (Laravel)

```bash
#1. Clone o projeto e entre no diretório
git clone https://github.com/seu-usuario/myfinance.git
cd myfinance/backend

#2. Instale as dependências
composer install

#3.Copie o .env e configure seu banco de dados
cp .env.example .env
#edite as variáveis DB_ no .env

#4. Gere a key e configure o JWT
php artisan key:generate
php artisan jwt:secret

#5. Rode as migrations
php artisan migrate

#6. Suba o servidor
php artisan serve
