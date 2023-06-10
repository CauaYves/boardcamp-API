# Documentação API boardcamp

# CRUD de Jogos
## Create  
Rota: POST /games
Request: body no formato:
```
{
  "name": "Banco Imobiliário",
  "image": "http://www.imagem.com.br/banco_imobiliario.jpg",
  "stockTotal": 3,
  "pricePerDay": 1500
}
```
### Response: status 201, sem dados  

### Regras de Negócio:  

name deve estar presente e não pode estar vazio.  
stockTotal e pricePerDay devem ser maiores que 0.  
Se name já existe, deve retornar status 409.  

## Read  
Rota: GET /games  
## Response: lista dos jogos encontrados, seguindo o formato abaixo:  
```
[
  {
    "id": 1,
    "name": "Banco Imobiliário",
    "image": "http://",
    "stockTotal": 3,
    "pricePerDay": 1500
  },
  {
    "id": 2,
    "name": "Detetive",
    "image": "http://",
    "stockTotal": 1,
    "pricePerDay": 2500
  }
]
```

# CRUD de Clientes

## Create
Rota: POST /customers  
Request: body no formato:  

```
{
  "name": "João Alfredo",
  "phone": "21998899222",
  "cpf": "01234567890",
  "birthday": "1992-10-25"
}
```
## Response: status 201, sem dados  
### Regras de negócio:  

-cpf deve ser uma string com 11 caracteres numéricos.  
-phone deve ser uma string com 10 ou 11 caracteres numéricos.  
-name deve estar presente e não pode ser uma string vazia.  
-birthday deve ser uma data válida.  
-Se cpf já existe, deve retornar status 409.  

## Read
Rota: GET /customers  
Response: lista com todos os clientes:  

```
[
  {
    "id": 1,
    "name": "João Alfredo",
    "phone": "21998899222",
    "cpf": "01234567890",
    "birthday": "1992-10-05"
  },
  {
    "id": 2,
    "name": "Maria Alfreda",
    "phone": "21998899221",
    "cpf": "12345678910",
    "birthday": "1994-12-25"
  }
]
```

## Update  

Rota: PUT /customers/:id  
Request: body no formato:  

```
{
  "name": "João Alfredo",
  "phone": "21998899222",
  "cpf": "01234567890",
  "birthday": "1992-10-05"
}
```

## Response: status 200, sem dados
### Regras de negócio:  

-cpf deve ser uma string com 11 caracteres numéricos.  
-phone deve ser uma string com 10 ou 11 caracteres numéricos.  
-name deve estar presente e não pode ser uma string vazia.  
-birthday deve ser uma data válida.  
-Se cpf já existe para outro cliente, deve retornar status 409.   

# CRUD de Aluguéis

## Create

Rota: POST /rentals
Request: body no formato:

```
{
  "customerId": 1,
  "gameId": 1,
  "daysRented": 3
}
```
## Response: status 201, sem dados
### Regras de Negócio:  

-rentDate e originalPrice serão populados automaticamente.  
-rentDate: data atual no momento da inserção.  
-originalPrice: daysRented multiplicado pelo preço por dia do jogo no momento da inserção.  
-returnDate e delayFee começam como null.  
-Verifica se customerId se refere a um cliente existente.  
-Verifica se gameId se refere a um jogo existente.  
-daysRented deve ser um número maior que 0.  
-Verifica se existem jogos disponíveis.  
  
##Read

Rota: GET /rentals
## Response: lista com todos os aluguéis, contendo o customer e o game do aluguel em cada aluguel:

```
[
  {
    "id": 1,
    "customerId": 1,
    "gameId": 1,
    "rentDate": "2021-06-20",
    "daysRented": 3,
    "returnDate": null,
    "originalPrice": 4500,
    "delayFee": null,
    "customer": {
      "id": 1,
      "name": "João Alfredo"
    },
    "game": {
      "id": 1,
      "name": "Banco Imobiliário"
    }
  }
]
```

## Update  

### Finalizar aluguel

Rota: POST /rentals/:id/return
### Response: status 200, sem dados.
### Regras de Negócio:

-returnDate deve ser populado com a data atual do momento do retorno.  
-delayFee deve ser automaticamente populado com um valor equivalente ao número de dias de atraso vezes o preço por dia do jogo no momento do retorno.  
-Verifica se o id do aluguel fornecido existe.  
-Verifica se o aluguel já não está finalizado.  

## Delete

Rota: DELETE /rentals/:id

### Response: status 200, sem dados
### Regras de Negócio:
-Verifica se o id fornecido existe.  
-Verifica se o aluguel já não está finalizado.  
