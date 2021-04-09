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
      .where("user")
      .equals(body.user._id)
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

  public createEvent = (
    { body }: iCustomRequest<iEventReq>,
    res: Response<iCompleteResponse>
  ) => {
    const event = new Event(body);
    event
      .save()
      .then((ev: iEventDocument) => {
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
      .catch((err) => {
        return res.status(500).json({
          status: "error",
          err: err,
        });
      });
  };

  public updateEvent = (
    { body, params }: iCustomRequest<iEventReq>,
    res: Response<iCompleteResponse>
  ) => {
    const eventId = params.id;

    Event.findByIdAndUpdate(
      eventId,
      body as iEventDocument,
      { new: true },
      (err, event) => {
        if (err) {
          return res.status(500).json({
            status: "error",
            err: err,
          });
        } else {
          if (event) {
            if (event.user?._id !== body.user._id) {
              return res.status(401).json({
                status: "error",
                err: "No tiene privilegio de editar este evento",
              });
            } else {
              event.populate("user", (err, popEvent) => {
                if (err) {
                  return res.status(500).json({
                    status: "error",
                    err: "Server Error",
                  });
                } else {
                  if (popEvent) {
                    return res.status(200).json({
                      status: "success",
                      event: {
                        ...popEvent.toJSON(),
                        user: {
                          _id: popEvent.user?._id,
                          name: popEvent.user?.name as string,
                        } as iUserDocument,
                      },
                      user: body.user,
                    });
                  } else {
                    return res.status(404).json({
                      status: "error",
                      err: "Event not found...",
                    });
                  }
                }
              });
            }
          } else {
            return res.status(404).json({
              status: "error",
              err: "Event not found...",
            });
          }
        }
      }
    );
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
