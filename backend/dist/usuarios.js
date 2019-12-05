"use strict";
exports.__esModule = true;
var Usuario = /** @class */ (function () {
    function Usuario(email, nome, senha) {
        this.email = email;
        this.nome = nome;
        this.senha = senha;
    }
    Usuario.prototype.combinaUsuario = function (outro) {
        return outro !== undefined &&
            outro.email === this.email &&
            outro.senha === this.senha;
    };
    return Usuario;
}());
exports.Usuario = Usuario;
// Aula 115 1:40 - tipagem por chave e valor
exports.usuarios = {
    'raissa@gmail.com': new Usuario('raissa@gmail.com', 'Raíssa', '131232'),
    'tati@gmail.com': new Usuario('tati@gmail.com', 'Tati', '131232')
};
