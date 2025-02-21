# API AdonisJS: Registro, Login e Cálculo de Média

Esta API é construída usando AdonisJS. Ela permite que os usuários se registrem, façam login e calculem a média de 10 números com autenticação baseada em token.

## Endpoints Disponíveis

### 1. Registro de Usuário
**Endpoint:** `/register`

**Método:** `POST`

**Descrição:** Registra um novo usuário no sistema.

**Payload:**
```json
{
  "username": "usuario_exemplo",
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "Usuário registrado com sucesso!",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "username": "usuario_exemplo"
  }
}
```

---

### 2. Login do Usuário
**Endpoint:** `/login`

**Método:** `POST`

**Descrição:** Permite que um usuário faça login e receba um token JWT para autenticação.

**Payload:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso:**
```json
{
  "message": "Login realizado com sucesso!",
  "token": "<token_jwt>",
  "user": {
    "id": 1,
    "email": "usuario@example.com",
    "username": "usuario_exemplo"
  }
}
```

---

### 3. Cálculo da Média
**Endpoint:** `/calculate-average`

**Método:** `POST`

**Descrição:** Calcula a média de 10 números enviados no corpo da requisição. Este endpoint é protegido e requer autenticação.

**Cabeçalho de Autenticação:**
```http
Authorization: Bearer <token_jwt>
```

**Payload:**
```json
{
  "email": "usuario@example.com",
  "password": "senha123",
  "numbers": [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
}
```

**Resposta de Sucesso:**
```json
{
  "message": "A média foi calculada com sucesso!",
  "average": 55
}
```

---

## Observações Importantes
- O token JWT expira em 1 hora. Certifique-se de fazer login novamente caso ele expire.
- Os números enviados para cálculo da média devem ser um array de exatamente 10 números inteiros.
- Use ferramentas como Postman ou Insomnia para testar os endpoints facilmente.

---

## Instalação e Configuração

1. Clone o repositório:
   ```bash
   git clone <url-do-repositorio>
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env` com as credenciais do banco de dados.

4. Rode as migrações:
   ```bash
   adonis migration:run
   ```

5. Rode o servidor:
   ```bash
   adonis serve --dev
   ```

Agora você pode acessar a API em `http://127.0.0.1:3333`.
