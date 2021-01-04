import { Router } from 'express';
import AuthController from './../controllers/AuthController';
import { check } from 'express-validator'
import validateFields from '../middlewares/validate-fields';
import validateJWT from './../middlewares/validate-jwt';

const auth = Router();

const controller = new AuthController();


auth.post(
  '/',
  [
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña debe de ser de más de 6 caractéres').isLength({ min: 6 }),
    validateFields
  ],
  controller.loginUser
);

auth.post(
  '/new',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña debe de ser de más de 6 caractéres').isLength({ min: 6 }),
    check('confirm', 'Debe de confirmar la contraseña').not().isEmpty(),
    validateFields
  ],
  controller.crearUsuario
);

auth.get(
  '/renew',
  validateJWT,
  controller.revalidarToken
);

export default auth;