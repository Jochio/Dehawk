import express from 'express';
import userHandler from '../controllers/user';

const userRoute = express.Router();

userRoute.post('/signup', userHandler);
userRoute.post('/login');

export default userRoute;
