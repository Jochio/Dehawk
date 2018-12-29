import express from 'express';
import { userHandler, loginHandler } from '../controllers/user';

const userRoute = express.Router();

userRoute.post('/signup', userHandler);
userRoute.post('/login', loginHandler);

export default userRoute;
