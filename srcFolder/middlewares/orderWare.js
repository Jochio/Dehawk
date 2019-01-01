import Joi from 'joi';
import orders from '../dummyData/objModel';
import userModel from '../dummyData/userModel';
import { newOrderSchema, idSchema, userIdSchema } from './inputModel';


class orderValidator {
  static orderHelper(request, response, next) {
    const { error } = Joi.validate(request.body, newOrderSchema, { abortEarly: false });
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

  static getOrderHelper(request, response, next) {
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
    const orderExist = orders.find(order => order.id === Number(id));
    if (orderExist === undefined) {
      response.status(404)
        .json({
          success: false,
          message: 'Order does not exist',
        });
      return false;
    }
    request.body = orderExist;
    next();
  }

  static userOrderHelper(request, response, next) {
    const { userId } = request.params;
    const { error } = Joi.validate(request.params, userIdSchema, { abortEarly: false });
    if (error !== null) {
      response.status(400)
        .json({
          success: false,
          message: error.details.map(d => d.message)
        });
      return false;
    }
    const user = userModel.find(users => users.id === Number(userId));
    if (user === undefined) {
      response.status(404)
        .json({
          success: false,
          message: 'user does not exist',
        });
      return false;
    }

    const list = orders.filter(order => order.email === user.email);
    if (list === undefined) {
      response.status(404)
        .json({
          success: false,
          message: 'user order does not exist'
        });
    }
    request.body = list;
    next();
  }
}

const { orderHelper, getOrderHelper, userOrderHelper } = orderValidator;

export { orderHelper, getOrderHelper, userOrderHelper };
