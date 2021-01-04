"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = __importDefault(require("../models/User"));
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var jwt_1 = require("./../helpers/jwt");
var AuthController = (function () {
    function AuthController() {
        this.crearUsuario = function (_a, res) {
            var body = _a.body;
            var email = body.email, password = body.password, confirm = body.confirm;
            if (password !== confirm) {
                return res.status(400).json({
                    status: 'error',
                    err: "Las contraseñas no coinciden",
                });
            }
            User_1.default.findOne({ email: email }).then(function (result) {
                if (result) {
                    return res.status(400).json({
                        status: 'error',
                        err: 'El usuario que se intenta crear ya existe en la base de datos...'
                    });
                }
                else {
                    bcryptjs_1.default.hash(password, 10).then(function (hash) {
                        var user = new User_1.default(__assign(__assign({}, body), { password: hash }));
                        user.save().then(function (newUser) {
                            jwt_1.getJWT(newUser._id, newUser.name).then(function (token) {
                                return res.status(200).json({
                                    status: 'success',
                                    user: {
                                        _id: newUser._id,
                                        name: newUser.name,
                                        token: token
                                    }
                                });
                            }).catch(function (err) {
                                return res.status(500).json({
                                    status: 'error',
                                    err: err
                                });
                            });
                        }).catch(function () {
                            return res.status(500).json({
                                status: 'error',
                                err: 'Server error'
                            });
                        });
                    }).catch(function () {
                        return res.status(500).json({
                            status: 'error',
                            err: 'Server error'
                        });
                    });
                }
            }).catch(function () {
                return res.status(500).json({
                    status: 'error',
                    err: 'Server error'
                });
            });
        };
        this.loginUser = function (_a, res) {
            var body = _a.body;
            var email = body.email, password = body.password;
            User_1.default.findOne({ email: email }).then(function (result) {
                if (!result) {
                    return res.status(400).json({
                        status: 'error',
                        err: 'Email o contraseña incorrectos',
                    });
                }
                else {
                    bcryptjs_1.default.compare(password, result.password).then(function (same) {
                        if (same) {
                            jwt_1.getJWT(result._id, result.name).then(function (token) {
                                return res.status(200).json({
                                    status: 'success',
                                    user: {
                                        _id: result._id,
                                        name: result.name,
                                        token: token
                                    }
                                });
                            }).catch(function (err) {
                                return res.status(500).json({
                                    status: 'error',
                                    err: err
                                });
                            });
                        }
                        else {
                            return res.status(400).json({
                                status: 'error',
                                err: 'Email o contraseña incorrectos',
                            });
                        }
                    }).catch(function () {
                        return res.status(500).json({
                            status: 'error',
                            err: 'Server error'
                        });
                    });
                }
            }).catch(function () {
                return res.status(500).json({
                    status: 'error',
                    err: 'Server error'
                });
            });
        };
        this.revalidarToken = function (req, res) {
            var _a = req.body.user, _id = _a._id, name = _a.name;
            jwt_1.getJWT(_id, name).then(function (token) {
                if (token) {
                    return res.json({
                        status: 'success',
                        user: {
                            _id: _id,
                            name: name,
                            token: token
                        }
                    });
                }
                else {
                    return res.status(500).json({
                        status: 'error',
                        err: 'No se pudo generar el token...'
                    });
                }
            }).catch(function () {
                return res.status(500).json({
                    status: 'error',
                    err: 'Server error'
                });
            });
        };
    }
    return AuthController;
}());
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map