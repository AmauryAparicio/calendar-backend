import jwt from 'jsonwebtoken';

export const getJWT = (id: string, name: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const payload = { id, name };

    jwt.sign(payload, process.env.SECRET_JWT_SEED as string, {
      expiresIn: '2h',
    }, (err, token) => {
      if (err) {
        console.log(err);
        reject('No se pudo generar el token');
      } else {
        if (token) {
          resolve(token);
        } else {
          reject('No se pudo generar el token');
        }
      }
    });
  });
}

