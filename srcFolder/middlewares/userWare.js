import Joi from 'joi';
import users from '../dummyData/userModel';
import { newUserSchema } from './inputModel';

class UserValidator {
  static signupValidator(request, response, next) {
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
  signupValidator
} = UserValidator;
export default signupValidator;
