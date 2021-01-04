"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = __importDefault(require("./../controllers/AuthController"));
var express_validator_1 = require("express-validator");
var validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
var validate_jwt_1 = __importDefault(require("./../middlewares/validate-jwt"));
var auth = express_1.Router();
var controller = new AuthController_1.default();
auth.post('/', [
    express_validator_1.check('email', 'El correo es obligatorio').isEmail(),
    express_validator_1.check('password', 'La contraseña debe de ser de más de 6 caractéres').isLength({ min: 6 }),
    validate_fields_1.default
], controller.loginUser);
auth.post('/new', [
    express_validator_1.check('name', 'El nombre es obligatorio').not().isEmpty(),
    express_validator_1.check('email', 'El correo es obligatorio').isEmail(),
    express_validator_1.check('password', 'La contraseña debe de ser de más de 6 caractéres').isLength({ min: 6 }),
    express_validator_1.check('confirm', 'Debe de confirmar la contraseña').not().isEmpty(),
    validate_fields_1.default
], controller.crearUsuario);
auth.get('/renew', validate_jwt_1.default, controller.revalidarToken);
exports.default = auth;
//# sourceMappingURL=auth.js.map