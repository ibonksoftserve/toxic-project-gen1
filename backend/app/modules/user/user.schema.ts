import Joi from 'joi';
import { JoiObjectId } from '../../shared/validators';
import { AccountStatus, Status } from './user.model';

const AccountStatusValues = Object.values(AccountStatus)
const StatusValues = Object.values(Status);

export default {
  userCreate: Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    nickname: Joi.string().required(),
    avatar: Joi.string().optional(),
    birth_date: Joi.date().optional(),
    created_date: Joi.date().optional(),
    updated_date: Joi.date().optional(),
    status: Joi.string().valid(...StatusValues).optional(),
    account_status: Joi.string().valid(...AccountStatusValues).optional(),
    account_status_change_date: Joi.date().optional(),
    confirmation_code: Joi.object({
      code: Joi.string().required(),
      expired_time: Joi.number().required(),
    }).optional(),
    country: Joi.string().optional(),
    is_guest: Joi.boolean().optional(),
  }),
  userId: Joi.object({
    id: JoiObjectId().required()
  }),
  userUpdate: Joi.object({
    email: Joi.string().optional().email(),
    password: Joi.string().optional(),
    nickname: Joi.string().optional(),
    avatar: Joi.string().optional(),
    birth_date: Joi.date().optional(),
    created_date: Joi.date().optional(),
    updated_date: Joi.date().optional(),
    status: Joi.string().valid(...StatusValues).optional(),
    account_status: Joi.string().valid(...AccountStatusValues).optional(),
    account_status_change_date: Joi.date().optional(),
    confirmation_code: Joi.object({
      code: Joi.string().required(),
      expired_time: Joi.number().required(),
    }).optional(),
    country: Joi.string().optional(),
    is_guest: Joi.boolean().optional(),
  })
};
