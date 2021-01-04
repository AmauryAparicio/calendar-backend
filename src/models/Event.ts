import { Schema, model } from "mongoose";
import { iEventDocument } from "../interfaces";

const EventSchema = new Schema({
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
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const Event = model<iEventDocument>('Event', EventSchema, 'events');

export default Event;