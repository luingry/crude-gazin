# crude-gazin
Sistema CRUDE desenvolvido conforme requisitos propostos para o teste de desenvolvedores da Gazin.

## **Arquitetura**
O projeto utiliza NodeJS e MySQL no back-end. Enquanto que o front-end foi desenvolvido usando HTML e css com bibliotecas auxiliares como Bootstrap e jQuery.

## **Instruções**
O arquivo chamado **generate_db.sql**, localizado na raiz do projeto, deve ser executado no banco de dados MySQL de sua máquina.

Acessando o caminho **server/db** encontra-se o arquivo **dbconnection.js**.
Neste arquivo encontra-se as configurações de conexão com o banco de dados, onde o valor da chave **user** e **password** deve ser alterado de acordo com as configurações do banco de dados da sua máquina.

Com node e npm instalado na máquina, rode o comando abaixo para instalar as dependências:
```
npm i
npm run server
```
Feito isto o servidor deverá estar rodando. 
Acesse o arquivo **index.html** que se encontra na raiz do projeto para visualizar o client da API.

## **Observações**
- Os erros retornados pela API são logados no console do navegador.
