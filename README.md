```txt
Open Finance API - Documentação
API em Node.js + Express + MongoDB que simula um sistema financeiro simples, com clientes, contas e transações.

PRÉ-REQUISITOS
Node.js >= 18

Docker

Docker Compose

CLONAR O REPOSITÓRIO
git clone https://github.com/Richard-Strn/open-finance.git
cd open-finance

CONFIGURAÇÃO DO AMBIENTE
Criar o arquivo .env baseado no example.env com as informações do ambiente:

cp example.env .env
PORT: porta em que a API será exposta

MONGO_URI: string de conexão com MongoDB (container Docker)

RODANDO A API COM DOCKER
No terminal do projeto: docker-compose up --build

ESTRUTURA DE DADOS
Customer (Cliente):
{
 "_id": "cus_001",
 "name": "Maria Silva",
 "cpf": "12345678900",
 "email": "maria@email.com",
 "accounts": []
}
Account (Conta):
{
 "_id": "acc_001",
 "type": "checking",
 "branch": "0001",
 "number": "12345-6",
 "balance": 2500.75,
 "transactions": []
}
Transaction (Transação):
{
 "_id": "txn_001",
 "date": "2025-09-16",
 "description": "Depósito via TED",
 "amount": 500,
 "type": "credit",
 "category": "Income"
}

ENDPOINTS DA API
Criar cliente
Método: POST

URL: http://localhost:{PORTA}/customers

Headers: Content-Type: application/json

Body (raw / JSON):

{
  "name": "Marina Silva",
  "cpf": "12345678903",
  "email": "marina123@email.com"
}

Resposta esperada:
{
  "name": "Marina Silva",
  "cpf": "12345678903",
  "email": "marina123@email.com",
  "accounts": [],
  "_id": "ID_DO_CLIENTE",
  "__v": 0
}

Guarde o _id retornado, vamos usar no próximo passo.

Criar conta para o cliente
Método: POST

URL: http://localhost:{PORTA}/customers/{ID_DO_CLIENTE}/accounts

Headers: Content-Type: application/json

Body (raw / JSON):

{
  "type": "checking",
  "branch": "0001",
  "number": "12345-6",
  "balance": 1000
}

Resposta esperada:
{
  "_id": "ID_DA_CONTA",
  "type": "checking",
  "branch": "0001",
  "number": "12345-6",
  "balance": 1000,
  "transactions": []
}

Guarde o _id da conta para consultas de saldo e transações.

Consultar saldo da conta
Método: GET

URL: http://localhost:{PORTA}/accounts/{ID_DA_CONTA}/balance

Resposta esperada:
{
  "balance": 1000
}

Registrar transação (crédito ou débito)
Método: POST

URL: http://localhost:{PORTA}/accounts/{ID_DA_CONTA}/transactions

Headers: Content-Type: application/json

Body (raw / JSON) — exemplo de crédito:

{
  "date": "2025-09-10",
  "description": "Depósito via transferência",
  "amount": 500,
  "type": "credit",
  "category": "Income"
}

Resposta esperada:
{
  "_id": "ID_DA_TRANSACAO",
  "date": "2025-09-10",
  "description": "Depósito via transferência",
  "amount": 500,
  "type": "credit",
  "category": "Income"
}

Para débito, basta trocar "type": "debit" e o valor será subtraído do saldo da conta.

Listar transações (extrato)
Método: GET

URL: http://localhost:{PORTA}/accounts/{ID_DA_CONTA}/transactions

Resposta esperada:
[
  {
    "_id": "ID_DA_TRANSACAO",
    "date": "2025-09-10",
    "description": "Depósito via transferência",
    "amount": 500,
    "type": "credit",
    "category": "Income"
  }
]

OBSERVAÇÕES
Todas as respostas estão em JSON

Datas seguem o padrão ISO 8601 (YYYY-MM-DD)

Não há autenticação implementada
