"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var api_config_1 = require("./api-config");
// Aula 115
exports.tratarAutorizacao = function (req, res, next) {
    var token = extraitToken(req);
    if (!token) {
        res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"');
        res.status(401).json({ menssagem: 'Você precisa se autenticar.' });
    }
    else {
        jwt.verify(token, api_config_1.apiConfig.secret, function (error, decoded) {
            if (decoded) {
                next();
            }
            else {
                res.status(403).json({ menssagem: 'Não autorizado.' });
            }
        });
    }
};
function extraitToken(req) {
    var token = undefined;
    if (req.headers && req.headers.authorization) {
        // Authorization: Bearer ZZZ.ZZZ.ZZZ
        var partes = req.headers.authorization.split(' ');
        if (partes.length === 2 && partes[0] === 'Bearer') {
            token = partes[1];
        }
    }
    return token;
}
