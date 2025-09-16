## Open Finance API

Uma API RESTful em **Node.js**, **Express** e **MongoDB** que simula um sistema financeiro simples.
### Tecnologias

- Node.js >= 18
- Express.js
- MongoDB (Docker)
- Docker & Docker Compose

---

### Como começar

**Clone o repositório:**
```bash
git clone https://github.com/Richard-Strn/open-finance.git
cd open-finance
```

**Configure o ambiente:**
```bash
cp example.env .env
```
- `PORT`: porta da API
- `MONGO_URI`: string de conexão com MongoDB (use o container Docker)

**Suba a API com Docker:**
```bash
docker-compose up --build
```

---

### Exemplos de Estrutura de Dados

<details>
<summary>Cliente</summary>

```json
{
  "_id": "cus_001",
  "name": "Maria Silva",
  "cpf": "12345678900",
  "email": "maria@email.com",
  "accounts": []
}
```
</details>

<details>
<summary>Conta</summary>

```json
{
  "_id": "acc_001",
  "type": "checking",
  "branch": "0001",
  "number": "12345-6",
  "balance": 2500.75,
  "transactions": []
}
```
</details>

<details>
<summary>Transação</summary>

```json
{
  "_id": "txn_001",
  "date": "2025-09-16",
  "description": "Depósito via TED",
  "amount": 500,
  "type": "credit",
  "category": "Income"
}
```
</details>

---

### Endpoints Principais

**Criar cliente**
```http
POST /customers
Content-Type: application/json
Body:
{
  "name": "Marina Silva",
  "cpf": "12345678903",
  "email": "marina123@email.com"
}
```

**Criar conta para o cliente**
```http
POST /customers/{ID_DO_CLIENTE}/accounts
Content-Type: application/json
Body:
{
  "type": "checking",
  "branch": "0001",
  "number": "12345-6",
  "balance": 1000
}
```

**Consultar saldo**
```http
GET /accounts/{ID_DA_CONTA}/balance
```

**Registrar transação**
```http
POST /accounts/{ID_DA_CONTA}/transactions
Content-Type: application/json
Body:
{
  "date": "2025-09-10",
  "description": "Depósito via transferência",
  "amount": 500,
  "type": "credit",
  "category": "Income"
}
```

**Listar transações**
```http
GET /accounts/{ID_DA_CONTA}/transactions
```

---

### Observações

- Todas as respostas estão em JSON
- Datas no padrão ISO 8601 (`YYYY-MM-DD`)
- Não há autenticação implementada (aplicação de demonstração)