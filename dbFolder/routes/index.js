import express from 'express';
import { signupUser, loginUser } from '../controller/userdb';

const dbRoutes = express.Router();
// User Routes
dbRoutes.post('/auth/signup', signupUser);
dbRoutes.post('/auth/login', loginUser);

export default dbRoutes;
