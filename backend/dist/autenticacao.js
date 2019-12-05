"use strict";
exports.__esModule = true;
var usuarios_1 = require("./usuarios");
var jwt = require("jsonwebtoken");
var api_Config_1 = require("./api-Config");
// Aula 111
exports.tratarAutenticacao = function (req, res) {
    var usuario = req.body;
    if (loginValido(usuario)) {
        var dbUsuario = usuarios_1.usuarios[usuario.email];
        // Aula 114 - JWT (Json Web Token)
        var token = jwt.sign({
            sub: dbUsuario.email,
            iss: 'meat-api' // klein obrigatório - Quem emitiu o token
        }, api_Config_1.apiConfig.secret); // password para poder assinar o token
        res.json({ nome: dbUsuario.nome, email: dbUsuario.email, accessToken: token });
    }
    else {
        res.status(403).json({ mensagem: 'Dados inválidos.' });
    }
};
function loginValido(usuario) {
    if (!usuario) {
        return false;
    }
    var dbUsuario = usuarios_1.usuarios[usuario.email];
    return dbUsuario !== undefined && dbUsuario.combinaUsuario(usuario);
}
/*
Aula 11 - 8:00
400 - Bad request - geralmente utilizado quando má formação do request
401 - Não autorizado, informando como deve ser informado autorização
403 - Autenticação inválida, ou usuário não possui autorização
422 - Unprocessable entity, valida dados e não está de acordo
*/
