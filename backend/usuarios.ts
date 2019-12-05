export class Usuario {
  constructor(public email: string,
              public nome: string,
              public senha: string) {}

  combinaUsuario(outro: Usuario): boolean {
    return outro !== undefined        &&
           outro.email === this.email &&
           outro.senha === this.senha
  }
}


// Aula 115 1:40 - tipagem por chave e valor
export const usuarios: {[key: string]: Usuario} = {
  'raissa@gmail.com': new Usuario('raissa@gmail.com', 'Raíssa', '131232'),
  'tati@gmail.com': new Usuario('tati@gmail.com'    , 'Tati'  , '131232')
}
