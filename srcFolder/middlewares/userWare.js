import Joi from 'joi';
import users from '../dummyData/userModel';
import { newUserSchema, loginSchema, idSchema } from './inputModel';

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
    const dupEmail = users.find(user => user.email === email);
    if (dupEmail !== undefined) {
      response.status(409)
        .json({
          success: false,
          message: 'Email already exist, please use another email or login.'
        });
      return false;
    }
    next();
  }

  static loginHelper(request, response, next) {
    const { email, password } = request.body;
    const { error } = Joi.validate(request.body, loginSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          success: false,
          message: error.details.map(d => d.message)
        });
      return false;
    }
    const userExist = users.find(user => user.email === email);
    if (userExist === undefined || (userExist.password !== password)) {
      response.status(404)
        .json({
          success: false,
          message: 'email or password does not exist',
        });
      return false;
    }
    request.body.firstName = userExist.firstName;
    next();
  }

  static getUserHelper(request, response, next) {
    const { id } = request.params;
    const { error } = Joi.validate(request.params, idSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          success: false,
          message: error.details.map(d => d.message)
        });
      return false;
    }
    const userExist = users.find(user => user.id === Number(id));
    if (userExist === undefined) {
      response.status(404)
        .json({
          success: false,
          message: 'User does not exist',
        });
      return false;
    }
    request.body = userExist;
    next();
  }
}

//   static getSpecificUserValidator(request, response, next) {
//     let {userId} = request.params;
//     if (!Number(userId)) {
//         return response.status(400)
//             .json({
//                 status: 'Unsuccessful!',
//                 message: 'Sorry! this is an invalid URL'
//             });
//     }
//     const isExistUser = users.find(users => users.id === Number(userId));
//     if (!(isExistUser)) {
//         return response.status(404)
//             .json({
//                 status: 'Unsuccessful!',
//                 message: 'Sorry! User does not exist'
//             });
//     }
//     request.body.isExistUser = isExistUser;
//     next();
// }

// }

const {
  signupHelper, loginHelper, getUserHelper
} = UserValidator;
export { signupHelper, loginHelper, getUserHelper };
