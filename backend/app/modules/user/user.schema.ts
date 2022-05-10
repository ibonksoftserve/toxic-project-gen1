import Joi from 'joi';
import { JoiObjectId } from '../../shared/validators';

export default {
  userCreate: Joi.object({
    email: Joi.string().required().email(),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
  }),
  userId: Joi.object({
    id: JoiObjectId().required(),
  }),
  userUpdate: Joi.object({
    email: Joi.string().optional().email(),
    first_name: Joi.string().optional(),
    last_name: Joi.string().optional(),
  }),
};
