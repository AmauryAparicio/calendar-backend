import { Router } from 'express';
import { check } from 'express-validator';
import EventsController from '../controllers/EventsController';
import isDate from '../helpers/isDate';
import validateFields from '../middlewares/validate-fields';
import validateJWT from '../middlewares/validate-jwt';

const events = Router();

const controller = new EventsController();

events.use(validateJWT);

events.get(
  '/',
  controller.getEvents
);

events.post(
  '/',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end', 'Fecha de finalización obligatoria').custom(isDate),
    validateFields
  ],
  controller.createEvent
);

events.put(
  '/:id',
  [
    check('title', 'El título es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end', 'Fecha de finalización obligatoria').custom(isDate),
    validateFields
  ],
  controller.updateEvent
);

events.delete(
  '/:id',
  controller.deleteEvent
);

export default events;