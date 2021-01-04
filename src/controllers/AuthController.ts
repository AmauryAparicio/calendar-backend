import { Response } from "express";
import { iCustomRequest, iUserResponse, iUserDocument, iNewUser, iUserData, iUserReq } from "../interfaces";
import User from "../models/User";
import bcrypt from 'bcryptjs'
import { getJWT } from './../helpers/jwt'

export default class AuthController {

  public crearUsuario = ({ body }: iCustomRequest<iNewUser>, res: Response<iUserResponse>) => {

    const { email, password, confirm } = body;

    if (password !== confirm) {
      return res.status(400).json({
        status: 'error',
        err: "Las contraseñas no coinciden",
      });
    }

    User.findOne({ email }).then((result: iUserDocument) => {

      if (result) {

        return res.status(400).json({
          status: 'error',
          err: 'El usuario que se intenta crear ya existe en la base de datos...'
        });

      } else {

        bcrypt.hash(password, 10).then((hash) => {

          const user = new User({ ...body, password: hash });

          user.save().then((newUser) => {

            getJWT(newUser._id, newUser.name).then(token => {
              return res.status(200).json({
                status: 'success',
                user: {
                  _id: newUser._id,
                  name: newUser.name,
                  token: token
                }
              });
            }).catch(err => {
              return res.status(500).json({
                status: 'error',
                err: err
              });
            });


          }).catch(() => {

            return res.status(500).json({
              status: 'error',
              err: 'Server error'
            });

          });


        }).catch(() => {

          return res.status(500).json({
            status: 'error',
            err: 'Server error'
          });

        });

      }
    }).catch(() => {

      return res.status(500).json({
        status: 'error',
        err: 'Server error'
      });

    });

  }

  public loginUser = ({ body }: iCustomRequest<iUserData>, res: Response<iUserResponse>) => {

    const { email, password } = body;

    User.findOne({ email }).then((result: iUserDocument) => {
      if (!result) {
        return res.status(400).json({
          status: 'error',
          err: 'Email o contraseña incorrectos',
        });
      } else {

        bcrypt.compare(password, result.password).then(same => {
          if (same) {
            getJWT(result._id, result.name).then(token => {
              return res.status(200).json({
                status: 'success',
                user: {
                  _id: result._id,
                  name: result.name,
                  token: token
                }
              });
            }).catch(err => {
              return res.status(500).json({
                status: 'error',
                err: err
              });
            });
          } else {
            return res.status(400).json({
              status: 'error',
              err: 'Email o contraseña incorrectos',
            });
          }
        }).catch(() => {
          return res.status(500).json({
            status: 'error',
            err: 'Server error'
          });
        });

      }
    }).catch(() => {

      return res.status(500).json({
        status: 'error',
        err: 'Server error'
      });

    });

  }

  public revalidarToken = (req: iCustomRequest<iUserReq>, res: Response<iUserResponse>) => {

    const { _id, name } = req.body.user;

    getJWT(_id, name).then(token => {

      if (token) {
        return res.json({
          status: 'success',
          user: {
            _id: _id,
            name: name,
            token: token
          }
        });
      } else {
        return res.status(500).json({
          status: 'error',
          err: 'No se pudo generar el token...'
        });
      }
    }).catch(() => {
      return res.status(500).json({
        status: 'error',
        err: 'Server error'
      });
    });
  }
}

