'use strict';

import { Schema, model, Document } from 'mongoose';

export const DOCUMENT_NAME = 'User';
export const COLLECTION_NAME = 'user';

export enum AccountStatus {
  UNCONFIRMED = 'unconfirmed',
  CONFIRMED = 'confirmed',
  DELETED = 'deleted',
};

export enum Status {
  ONLINE = 'online',
  OFFLINE = 'offline',
  IN_GAME = 'in-game',
  LOBBY = 'lobby',
};

export interface IConfirmationCode {
  code: string;
  expired_time: number;
}

export interface IUser extends Document {
  email: string;
  password: string;
  nickname: string;
  avatar: string;
  birth_date: Date;
  created_date: Date;
  updated_date: Date;
  account_status: AccountStatus;
  account_status_change_date: Date;
  confirmation_code: IConfirmationCode;
  status: Status;
  country: string;
  is_guest: boolean;
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  nickname: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    trim: true,
    default: '',
  },
  birth_date: {
    type: Date,
    default: null,
  },
  created_date: {
    type: Date,
  },
  updated_date: {
    type: Date,
    default: null,
  },
  account_status: {
    type: String,
    enum: AccountStatus,
    default: AccountStatus.UNCONFIRMED,
  },
  account_status_change_date: {
    type: Date,
  },
  confirmation_code: {
    code: {
      type: String,
      trim: true,
    },
    expired_time: {
      type: Number,
    },
  },
  status: {
    type: String,
    enum: Status,
    default: Status.ONLINE,
  },
  country: {
    type: String,
    trim: true,
    default: '',
  },
  is_guest: {
    type: Boolean,
    default: true,
  }
}, {
  collection: COLLECTION_NAME,
  autoIndex: false
});

UserSchema.pre('save', function(next){
  if(this.isNew) {
    this.created_date = Date.now();
  }
  else if(this.isModified) {
    this.updated_date = Date.now();
  }
  next();
});


export const UserModel = model<IUser>(DOCUMENT_NAME, UserSchema);
export type IUserModelType = typeof UserModel;
