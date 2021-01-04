"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var dotenv_1 = __importDefault(require("dotenv"));
var cors_1 = __importDefault(require("cors"));
var auth_1 = __importDefault(require("./router/auth"));
var events_1 = __importDefault(require("./router/events"));
var config_1 = __importDefault(require("./database/config"));
dotenv_1.default.config();
var App = express_1.default();
App.use(cors_1.default());
config_1.default();
App.set('port', process.env.PORT || 3000);
App.use(express_1.default.static('public'));
App.use(express_1.default.json());
App.use(express_1.default.urlencoded({ extended: false }));
App.use('/api/auth', auth_1.default);
App.use('/api/events', events_1.default);
App.listen(App.get('port'), function () {
    console.log("Server on port " + App.get('port'));
});
//# sourceMappingURL=index.js.map