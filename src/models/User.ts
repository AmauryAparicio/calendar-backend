import { Schema, model } from 'mongoose'
import { iUserDocument } from '../interfaces';

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model<iUserDocument>('User', UserSchema, 'users');

export default User;