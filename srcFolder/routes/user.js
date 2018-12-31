import express from 'express';
import {
  userHandler, loginHandler, allUsers, oneUser
} from '../controllers/user';
import signupValidator from '../middlewares/userWare';

const userRoute = express.Router();

userRoute.post('/signup', signupValidator, userHandler);
userRoute.post('/login', loginHandler);
userRoute.get('/users', allUsers);
userRoute.get('/users/:id', oneUser);

export default userRoute;
