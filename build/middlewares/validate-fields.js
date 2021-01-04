"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_validator_1 = require("express-validator");
var validateFields = function (req, res, next) {
    var err = express_validator_1.validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({
            status: 'error',
            err: err.mapped()
        });
    }
    next();
};
exports.default = validateFields;
//# sourceMappingURL=validate-fields.js.map