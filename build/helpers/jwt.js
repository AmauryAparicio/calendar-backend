"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJWT = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var getJWT = function (id, name) {
    return new Promise(function (resolve, reject) {
        var payload = { id: id, name: name };
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h',
        }, function (err, token) {
            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            }
            else {
                if (token) {
                    resolve(token);
                }
                else {
                    reject('No se pudo generar el token');
                }
            }
        });
    });
};
exports.getJWT = getJWT;
//# sourceMappingURL=jwt.js.map