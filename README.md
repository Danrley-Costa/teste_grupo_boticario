# Teste Grupo Boticario

Cashback quer dizer “dinheiro de volta”, e funciona de forma simples: o revendedor faz uma
compra e seu benefício vem com a devolução de parte do dinheiro gasto no mês seguinte.

## Documentação

Clone este repositório

```bash
git clone https://github.com/Danrley-Costa/teste_grupo_boticario.git
```

## Execução

Para executar o projeto você irá precisar do docker e um container do mongodb ou pode alterar as variaveis de ambiente para um cluster do atlas.

Para instalar o container do mongodb use:

```bash
docker-compose up -d
```

Para instalar as dependencias de seu projeto você deve rodar o comando abaixo:

```bash
npm i
```

Iniciar a aplicação:

```bash
npm start
```

Rodar testes:

```bash
npm run teste
```

## Autenticação

A aplicação utiliza autenticação `JWT`, para consumir os endpoints protegidos é necessário um `Access Token` gerado no endpoint. O token tem 30 minutos de duração, podendo ser modificado nas variaveis de ambiente `EXPIREDTOKEN`.

Para obter um token (por exemplo, com cURL):

```bash

curl --request POST \
  --url http://localhost:3000/login \
  --header 'Content-Type: application/json' \
  --data '{
	"user":"seu username",
	"password":"sua senha"
}'

```

## Endpoints

Para criar um usuario:

```bash

curl --request POST \
  --url http://localhost:3000/create_retailer \
  --header 'Content-Type: application/json' \
  --data '{
        "name":"nome",
        "lastName": "segundo nome",
        "cpf": "seu cpf",
        "email": "seu email",
        "password": "sua senha"
    }'

```

Fazer login para obter um token:

```bash

curl --request POST \
  --url http://localhost:3000/login \
  --header 'Content-Type: application/json' \
  --data '{
	"user":"seu username",
	"password":"sua senha"
}'

```

Registrar uma compra:

```bash 

curl --request POST \
  --url http://localhost:3000/register_sale \
  --header 'Content-Type: application/json' \
  --header 'x-acces-token: <token gerado ao fazer o login>' \
  --data ' { 
        "idProduct": numero do produto,
        "price": 400,
        "cpf": "cpf do revendedor" 
    }'

```

Listar compras de um determinado cpf:

```bash

curl --request GET \
  --url http://localhost:3000/list_purchases \
  --header 'Content-Type: application/json' \
  --header 'x-acces-token: <token gerado ao fazer o login>' \
  --data '{
	"cpf": "cpf do revendedor"
}'

```

Listar cashback acumulado de cada cpf:

```bash

curl --request GET \
  --url http://localhost:3000/cashback \
  --header 'Content-Type: application/json' \
  --header 'x-acces-token: <token gerado ao fazer o login>' \
  --data '{
	"cpf":"cpf do revendedor"
}'

```

# Ferramentas utilizadas

- JavaScript ;
- Node: Node.js é um software de código aberto, multiplataforma, baseado no interpretador V8 do Google e que permite a execução de códigos JavaScript fora de um navegador web;
- Mongodb: MongoDB é um software de banco de dados orientado a documentos livre, de código aberto e multiplataforma.
- Docker: Docker é um conjunto de produtos de plataforma como serviço que usam virtualização de nível de sistema operacional para entregar software em pacotes chamados contêineres.

# Dependências utilizadas

    - "ajv": "^8.11.0",
    - "ajv-formats": "^2.1.1",
    - "axios": "^0.27.2",
    - "chai": "^4.3.6",
    - "chance": "^1.1.8",
    - "dotenv": "^16.0.1",
    - "express": "^4.18.1",
    - "jsonwebtoken": "^8.5.1",
    - "mocha": "^10.0.0",
    - "moment": "^2.29.4",
    - "mongoose": "^6.4.5",
    - "nyc": "^15.1.0",
    - "pino": "^8.3.0",
    - "pino-http": "^8.1.1",
    - "supertest": "^6.2.4"
    - "eslint": "^8.20.0",
    - "eslint-config-airbnb-base": "^15.0.0",
    - "eslint-plugin-import": "^2.26.0",
    - "nock": "^13.2.9",
    - "nodemon": "^2.0.19",
    - "pino-pretty": "^8.1.0"
