"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var validateJWT = function (req, res, next) {
    var token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            status: 'error',
            err: 'No hay token en la petición',
        });
    }
    else {
        try {
            var _a = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED), id = _a.id, name_1 = _a.name;
            req.body.user = {
                _id: id,
                name: name_1
            };
        }
        catch (_b) {
            return res.status(400).json({
                status: 'error',
                err: 'Token no válido',
            });
        }
        next();
    }
};
exports.default = validateJWT;
//# sourceMappingURL=validate-jwt.js.map