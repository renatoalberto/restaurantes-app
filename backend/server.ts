// Aula 109 - modelo inicial copiado do https://github.com/typicode/json-server#custom-routes-example
import * as jsonServer from 'json-server'
import { Express } from 'express'

import * as fs    from 'fs'
import * as https from 'https'

import { tratarAutenticacao } from './autenticacao'
import { tratarAutorizacao } from './autorizacao'

const server: Express = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// To handle POST, PUT and PATCH you need to use a body-parser
// You can use the one used by JSON Server
server.use(jsonServer.bodyParser)

// Aula 111 - Rota de Login - Middleware para login
server.post('/login', tratarAutenticacao)
server.use('/orders', tratarAutorizacao) // Aula 115

// Use default router
server.use(router)

// Obter uma referencia ao certificado e chave - Aula 110 4:40
const options = {
  cert: fs.readFileSync('./backend/keys/cert.pem'),
  key:  fs.readFileSync('./backend/keys/key.pem')
}

// Criar o servidor - Aula 110 5:20
https.createServer(options, server).listen(3001, () => {
  console.log('JSON Server is running on https://localhost:3001')
})
