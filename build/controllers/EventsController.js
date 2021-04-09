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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = __importDefault(require("../models/Event"));
var EventsController = (function () {
    function EventsController() {
        var _this = this;
        this.getEvents = function (_a, res) {
            var body = _a.body;
            Event_1.default.find()
                .where("user")
                .equals(body.user._id)
                .populate("user", "name")
                .then(function (events) {
                return res.status(200).json({
                    status: "success",
                    events: events,
                    user: body.user,
                });
            })
                .catch(function (err) {
                return res.status(500).json({
                    status: "error",
                    err: err,
                });
            });
        };
        this.createEvent = function (_a, res) {
            var body = _a.body;
            var event = new Event_1.default(body);
            event
                .save()
                .then(function (ev) {
                return res.status(201).json({
                    status: "success",
                    event: {
                        _id: ev._id,
                        title: ev.title,
                        notes: ev.notes,
                        start: ev.start,
                        end: ev.end,
                    },
                    user: body.user,
                });
            })
                .catch(function (err) {
                return res.status(500).json({
                    status: "error",
                    err: err,
                });
            });
        };
        this.updateEvent = function (_a, res) {
            var body = _a.body, params = _a.params;
            return __awaiter(_this, void 0, void 0, function () {
                var eventId, ev, save, err_1;
                var _b;
                return __generator(this, function (_c) {
                    switch (_c.label) {
                        case 0:
                            _c.trys.push([0, 4, , 5]);
                            eventId = params.id;
                            return [4, Event_1.default.findById(eventId).execPopulate()];
                        case 1:
                            ev = (_c.sent());
                            if (!(ev && ((_b = ev.user) === null || _b === void 0 ? void 0 : _b._id) === body.user._id)) return [3, 3];
                            ev.title = body.title;
                            ev.start = body.start;
                            ev.end = body.end;
                            ev.notes = body.notes;
                            return [4, ev.save()];
                        case 2:
                            save = _c.sent();
                            return [2, res.status(200).json({
                                    status: "success",
                                    event: __assign({}, save.toJSON()),
                                    user: body.user,
                                })];
                        case 3: return [2, res.status(401).json({
                                status: "error",
                                err: "No tiene privilegio de editar este evento",
                            })];
                        case 4:
                            err_1 = _c.sent();
                            return [2, res.status(500).json({
                                    status: "error",
                                    err: err_1,
                                })];
                        case 5: return [2];
                    }
                });
            });
        };
        this.deleteEvent = function (_a, res) {
            var body = _a.body, params = _a.params;
            var eventId = params.id;
            Event_1.default.findByIdAndDelete(eventId, {}, function (err, event) {
                if (err) {
                    return res.status(500).json({
                        status: "error",
                        err: err,
                    });
                }
                else {
                    if (event) {
                        return res.status(200).json({
                            status: "success",
                            msg: "Event deleted",
                        });
                    }
                    else {
                        return res.status(404).json({
                            status: "error",
                            err: "Event not found...",
                        });
                    }
                }
            });
        };
    }
    return EventsController;
}());
exports.default = EventsController;
//# sourceMappingURL=EventsController.js.map