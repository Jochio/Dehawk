import express from 'express';
import {
  userHandler, loginHandler, allUsers, oneUser
} from '../controllers/user';
import { signupHelper, loginHelper } from '../middlewares/userWare';

const userRoute = express.Router();

userRoute.post('/signup', signupHelper, userHandler);
userRoute.post('/login', loginHelper, loginHandler);
userRoute.get('/users', allUsers);
userRoute.get('/users/:id', oneUser);

export default userRoute;
