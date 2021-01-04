import { Request } from "express";
import { ValidationError } from "express-validator";
import { Document } from "mongoose";

export interface iUser {
  name: string,
  email: string,
}

export interface iUserData<T = any> extends iUser {
  _id?: T,
  password: string
}

export interface iUserLogin {
  email: string,
  password: string,
}

export interface iNewUser extends iUser {
  confirm: string,
  password: string,
}

export interface iUserDocument extends iUserData, Document { }

export interface iEvent {
  title: string,
  notes?: string,
  start: Date,
  end: Date,
}

export interface iEventData<T = any> extends iEvent {
  _id?: T
  user?: iUserDocument
}

export interface iEventDocument extends iEventData, Document { }

export interface iUserReq {
  user: {
    _id: string,
    name: string
  }
}

export interface iEventReq extends iUserReq {
  _id?: string,
  title: string,
  notes?: string,
  start: Date,
  end: Date,
}

export interface iCustomRequest<T> extends Request {
  body: T
}

export interface iCustomResponse {
  status: 'success' | 'error'
  err?: Record<string, ValidationError> | string,
  msg?: string,
}

export interface iUserResponse extends iCustomResponse {
  user?: {
    _id: string,
    name: string,
    token?: string,
  }
}

export interface iEventResponse extends iCustomResponse {
  event?: iEventData
  events?: Array<iEventData>
}

export interface iCompleteResponse extends iEventResponse, iUserResponse { }


export interface iToken { id: string, name: string, iat: number, exp: number }