# teste_grupo_boticario

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

iniciar a aplicação:

```bash
npm start
```

Rodar testes:

```bash
npm run teste
```

## Autenticação

A aplicação utiliza autenticação `JWT` para consumir os endpoints protegidos é necessário um `Access Token` gerado no endpoint. O token tem 30min de duração.

```bash
http://localhost:3000/login
```
