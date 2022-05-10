'use strict';

import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'user';

export interface IUser extends Document {
  email: string;
  first_name: string;
  last_name: string;
}

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    trim: true,
  },
  first_name: {
    type: String,
    require: true,
    trim: true,
  },
  last_name: {
    type: String,
    require: true,
    trim: true,
  },
}, {
  collection: COLLECTION_NAME,
  autoIndex: false,
});

export const UserModel = model<IUser>(DOCUMENT_NAME, UserSchema);
export type IUserModelType = typeof UserModel;
