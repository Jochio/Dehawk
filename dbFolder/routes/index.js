import express from 'express';
import { signupUser, loginUser } from '../controller/userdb';
import { signupHelper, loginHelper } from '../middleware/userWare';

const dbRoutes = express.Router();
// User Routes
dbRoutes.post('/auth/signup', signupHelper, signupUser);
dbRoutes.post('/auth/login', loginHelper, loginUser);

export default dbRoutes;
