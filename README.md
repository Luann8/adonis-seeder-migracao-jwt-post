# Projeto AdonisJS - Cálculo da Média

Este projeto é uma API simples construída com o framework AdonisJS. Ela permite calcular a média de um array de 10 números inteiros.

## Tecnologias

- **AdonisJS**: Framework web para Node.js.
- **JavaScript**: Linguagem de programação utilizada.

## Funcionalidades

- **Rota raiz (`GET /`)**: Exibe uma mensagem de boas-vindas e informações sobre as rotas disponíveis.
- **Rota de cálculo de média (`POST /calculate-average`)**: Calcula a média de um array de 10 números inteiros.

## Como rodar o projeto

1. **Clone o repositório**:

    ```bash
    git clone https://github.com/seu-usuario/nome-do-repositorio.git
    cd nome-do-repositorio
    ```

2. **Instale as dependências**:

    ```bash
    npm install
    ```

3. **Inicie o servidor de desenvolvimento**:

    ```bash
    adonis serve --dev
    ```

4. **Acesse no navegador**:
    Abra `http://127.0.0.1:3333` para visualizar o projeto.

## Endpoints

### `GET /`
Retorna uma mensagem de boas-vindas e a lista de rotas disponíveis.

**Exemplo de resposta:**

```json
{
  "message": "Servidor AdonisJS está rodando!",
  "routes": [
    {
      "method": "POST",
      "path": "/calculate-average",
      "description": "Calcula a média de um array de 10 números."
    }
  ]
}
