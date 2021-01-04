import { NextFunction, Request, Response } from "express";
import { validationResult } from 'express-validator'
import { iCustomResponse } from "../interfaces";

const validateFields = (req: Request, res: Response<iCustomResponse>, next: NextFunction) => {

  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      err: err.mapped()
    })
  }

  next();
}

export default validateFields;