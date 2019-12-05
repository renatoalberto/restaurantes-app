import { Request, Response } from 'express'
import * as jwt from 'jsonwebtoken'

import { apiConfig } from './api-config';

// Aula 115
export const tratarAutorizacao = (req: Request, res: Response, next) => {
  const token = extraitToken(req)

  if (!token) {
    res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"')
    res.status(401).json({menssagem: 'Você precisa se autenticar.'})
  } else {
    jwt.verify(token, apiConfig.secret, (error, decoded) => {
      if (decoded) {
        next()
      } else {
        res.status(403).json({menssagem: 'Não autorizado.'})
      }
    })
  }
}

function extraitToken(req: Request): string {
  let token = undefined

  if (req.headers && req.headers.authorization) {
    // Authorization: Bearer ZZZ.ZZZ.ZZZ
    const partes: string[] = req.headers.authorization.split(' ')

    if (partes.length === 2 && partes[0] === 'Bearer') {
      token = partes[1]
    }
  }

  return token
}
