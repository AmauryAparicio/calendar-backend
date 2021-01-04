"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_validator_1 = require("express-validator");
var EventsController_1 = __importDefault(require("../controllers/EventsController"));
var isDate_1 = __importDefault(require("../helpers/isDate"));
var validate_fields_1 = __importDefault(require("../middlewares/validate-fields"));
var validate_jwt_1 = __importDefault(require("../middlewares/validate-jwt"));
var events = express_1.Router();
var controller = new EventsController_1.default();
events.use(validate_jwt_1.default);
events.get('/', controller.getEvents);
events.post('/', [
    express_validator_1.check('title', 'El título es obligatorio').not().isEmpty(),
    express_validator_1.check('start', 'Fecha de inicio obligatoria').custom(isDate_1.default),
    express_validator_1.check('end', 'Fecha de finalización obligatoria').custom(isDate_1.default),
    validate_fields_1.default
], controller.createEvent);
events.put('/:id', [
    express_validator_1.check('title', 'El título es obligatorio').not().isEmpty(),
    express_validator_1.check('start', 'Fecha de inicio obligatoria').custom(isDate_1.default),
    express_validator_1.check('end', 'Fecha de finalización obligatoria').custom(isDate_1.default),
    validate_fields_1.default
], controller.updateEvent);
events.delete('/:id', controller.deleteEvent);
exports.default = events;
//# sourceMappingURL=events.js.map