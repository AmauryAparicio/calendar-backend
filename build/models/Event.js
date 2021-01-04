"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var EventSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});
var Event = mongoose_1.model('Event', EventSchema, 'events');
exports.default = Event;
//# sourceMappingURL=Event.js.map