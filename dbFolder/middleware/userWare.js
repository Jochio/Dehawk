import Joi from 'joi';
import { newUserSchema, loginSchema } from './inputModel';
import pool from '../db/dbConnect';
import { queryUsersByEmail } from '../db/queries';


class UserValidator {
  static signupHelper(request, response, next) {
    const { email } = request.body;
    const { error } = Joi.validate(request.body, newUserSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          success: false,
          message: error.details.map(d => d.message)
        });
      return false;
    }
    pool.query(queryUsersByEmail, [email])
      .then(data => {
        if (data.rowCount !== 0) {
          response.status(409)
            .json({
              success: false,
              message: 'Email already exist, please use another email or login.'
            });
          return false;
        }
        next();
      });
  }

  static loginHelper(request, response, next) {
    const { error } = Joi.validate(request.body, loginSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          success: false,
          message: error.details.map(d => d.message)
        });
      return false;
    }
    next();
  }
}

const { signupHelper, loginHelper } = UserValidator;

export { signupHelper, loginHelper };

