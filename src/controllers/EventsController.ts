import { Response } from "express";
import {
  iCompleteResponse,
  iCustomRequest,
  iEventDocument,
  iEventReq,
  iUserDocument,
  iUserReq,
} from "../interfaces";
import Event from "../models/Event";

export default class EventsController {
  public getEvents = (
    { body }: iCustomRequest<iUserReq>,
    res: Response<iCompleteResponse>
  ) => {
    Event.find()
      .populate("user", "name")
      .then((events: Array<iEventDocument>) => {
        return res.status(200).json({
          status: "success",
          events: events,
          user: body.user,
        });
      })
      .catch((err: any) => {
        return res.status(500).json({
          status: "error",
          err: err,
        });
      });
  };

  public createEvent = async (
    { body }: iCustomRequest<iEventReq>,
    res: Response<iCompleteResponse>
  ) => {
    try {
      const newEv = new Event(body);
      const savedEv = await newEv.save();
      const event = await savedEv
        .populate({ path: "user", select: "name" })
        .execPopulate();

      return res.status(201).json({
        status: "success",
        event,
        user: body.user,
      });
    } catch (err) {
      return res.status(500).json({
        status: "error",
        err: err,
      });
    }
  };

  public updateEvent = async (
    { body, params }: iCustomRequest<iEventReq>,
    res: Response<iCompleteResponse>
  ) => {
    try {
      const eventId = params.id;

      const ev = (await Event.findById(eventId)
        .populate("user", "name")
        .exec()) as iEventDocument | null;

      if (ev && ev.user?._id.toString() === body.user._id) {
        ev.title = body.title;
        ev.start = body.start;
        ev.end = body.end;
        ev.notes = body.notes;

        const save = await ev.save();

        return res.status(200).json({
          status: "success",
          event: {
            ...save.toJSON(),
          },
          user: body.user,
        });
      }
      return res.status(401).json({
        status: "error",
        err: "No tiene privilegio de editar este evento",
      });
    } catch (err) {
      console.log("Update error: ", err);
      return res.status(500).json({
        status: "error",
        err: err,
      });
    }
  };

  public deleteEvent = (
    { body, params }: iCustomRequest<iEventReq>,
    res: Response<iCompleteResponse>
  ) => {
    const eventId = params.id;

    Event.findByIdAndDelete(eventId, {}, (err, event) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          err: err,
        });
      } else {
        if (event) {
          return res.status(200).json({
            status: "success",
            msg: "Event deleted",
          });
        } else {
          return res.status(404).json({
            status: "error",
            err: "Event not found...",
          });
        }
      }
    });
  };
}
