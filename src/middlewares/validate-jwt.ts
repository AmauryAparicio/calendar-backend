import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { iCustomRequest, iCompleteResponse, iToken, iUserReq } from '../interfaces';

const validateJWT = (req: iCustomRequest<iUserReq>, res: Response<iCompleteResponse>, next: NextFunction) => {


  const token = req.header('x-token');

  if (!token) {
    return res.status(400).json({
      status: 'error',
      err: 'No hay token en la petición',
    });
  } else {
    try {
      const { id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED as string) as iToken;

      req.body.user = {
        _id: id,
        name: name
      }

    } catch {
      return res.status(400).json({
        status: 'error',
        err: 'Token no válido',
      });
    }
    next();
  }
}

export default validateJWT;