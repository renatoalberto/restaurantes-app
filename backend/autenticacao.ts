import { Request, Response } from 'express';
import { Usuario, usuarios } from './usuarios';

import * as jwt from 'jsonwebtoken'
import {apiConfig} from './api-Config'

// Aula 111
export const tratarAutenticacao = (req: Request, res: Response) => {
  const usuario: Usuario = req.body

  if (loginValido(usuario)) {
    const dbUsuario = usuarios[usuario.email]

    // Aula 114 - JWT (Json Web Token)
    const token = jwt.sign({
      sub: dbUsuario.email, // klein obrigatório - Identifica o usuário
      iss: 'meat-api'       // klein obrigatório - Quem emitiu o token
    }, apiConfig.secret ) // password para poder assinar o token

    res.json({nome: dbUsuario.nome, email: dbUsuario.email, accessToken: token})
  } else {
    res.status(403).json({mensagem: 'Dados inválidos.'})
  }
}

function loginValido(usuario: Usuario): boolean {
  if (!usuario) {
    return false
  }

  const dbUsuario = usuarios[usuario.email]
  return dbUsuario !== undefined && dbUsuario.combinaUsuario(usuario)
}

/*
Aula 11 - 8:00
400 - Bad request - geralmente utilizado quando má formação do request
401 - Não autorizado, informando como deve ser informado autorização
403 - Autenticação inválida, ou usuário não possui autorização
422 - Unprocessable entity, valida dados e não está de acordo
*/
