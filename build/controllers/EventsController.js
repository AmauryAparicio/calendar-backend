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
var Event_1 = __importDefault(require("../models/Event"));
var EventsController = (function () {
    function EventsController() {
        this.getEvents = function (_a, res) {
            var body = _a.body;
            Event_1.default.find().where('user').equals(body.user._id).populate('user', 'name').then(function (events) {
                return res.status(200).json({
                    status: 'success',
                    events: events,
                    user: body.user
                });
            }).catch(function (err) {
                return res.status(500).json({
                    status: 'error',
                    err: err,
                });
            });
        };
        this.createEvent = function (_a, res) {
            var body = _a.body;
            var event = new Event_1.default(body);
            event.save().then(function (ev) {
                return res.status(201).json({
                    status: 'success',
                    event: {
                        _id: ev._id,
                        title: ev.title,
                        notes: ev.notes,
                        start: ev.start,
                        end: ev.end,
                    },
                    user: body.user
                });
            }).catch(function (err) {
                return res.status(500).json({
                    status: 'error',
                    err: err
                });
            });
        };
        this.updateEvent = function (_a, res) {
            var body = _a.body, params = _a.params;
            var eventId = params.id;
            Event_1.default.findByIdAndUpdate(eventId, __assign(__assign({}, body), { user: body.user._id }), { new: true }, function (err, event) {
                var _a;
                if (err) {
                    return res.status(500).json({
                        status: 'error',
                        err: err,
                    });
                }
                else {
                    if (event) {
                        if (((_a = event.user) === null || _a === void 0 ? void 0 : _a._id) !== body.user._id) {
                            return res.status(401).json({
                                status: 'error',
                                err: 'No tiene privilegio de editar este evento'
                            });
                        }
                        else {
                            event.populate('user', function (err, popEvent) {
                                var _a, _b;
                                if (err) {
                                    return res.status(500).json({
                                        status: 'error',
                                        err: 'Server Error',
                                    });
                                }
                                else {
                                    if (popEvent) {
                                        return res.status(200).json({
                                            status: 'success',
                                            event: __assign(__assign({}, popEvent.toJSON()), { user: {
                                                    _id: (_a = popEvent.user) === null || _a === void 0 ? void 0 : _a._id,
                                                    name: (_b = popEvent.user) === null || _b === void 0 ? void 0 : _b.name
                                                } }),
                                            user: body.user
                                        });
                                    }
                                    else {
                                        return res.status(404).json({
                                            status: 'error',
                                            err: 'Event not found...'
                                        });
                                    }
                                }
                            });
                        }
                    }
                    else {
                        return res.status(404).json({
                            status: 'error',
                            err: 'Event not found...'
                        });
                    }
                }
            });
        };
        this.deleteEvent = function (_a, res) {
            var body = _a.body, params = _a.params;
            var eventId = params.id;
            Event_1.default.findByIdAndDelete(eventId, {}, function (err, event) {
                if (err) {
                    return res.status(500).json({
                        status: 'error',
                        err: err,
                    });
                }
                else {
                    if (event) {
                        return res.status(200).json({
                            status: 'success',
                            msg: 'Event deleted',
                        });
                    }
                    else {
                        return res.status(404).json({
                            status: 'error',
                            err: 'Event not found...',
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