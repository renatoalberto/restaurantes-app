"use strict";
exports.__esModule = true;
// Aula 109 - modelo inicial copiado do https://github.com/typicode/json-server#custom-routes-example
var jsonServer = require("json-server");
var fs = require("fs");
var https = require("https");
var autenticacao_1 = require("./autenticacao");
var autorizacao_1 = require("./autorizacao");
var server = jsonServer.create();
var router = jsonServer.router('db.json');
var middlewares = jsonServer.defaults();
// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares);
// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser);
// Aula 111 - Rota de Login - Middleware para login
server.post('/login', autenticacao_1.tratarAutenticacao);
server.use('/orders', autorizacao_1.tratarAutorizacao); // Aula 115
// Use default router
server.use(router);
// Obter uma referencia ao certificado e chave - Aula 110 4:40
var options = {
    cert: fs.readFileSync('./backend/keys/cert.pem'),
    key: fs.readFileSync('./backend/keys/key.pem')
};
// Criar o servidor - Aula 110 5:20
https.createServer(options, server).listen(3001, function () {
    console.log('JSON Server is running on https://localhost:3001');
});
