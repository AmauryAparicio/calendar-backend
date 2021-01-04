"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var moment_1 = __importDefault(require("moment"));
var isDate = function (value) {
    if (!value) {
        return false;
    }
    else {
        var date = moment_1.default(value);
        if (date.isValid()) {
            return true;
        }
        else {
            return false;
        }
    }
};
exports.default = isDate;
//# sourceMappingURL=isDate.js.map