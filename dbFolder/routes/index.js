import express from 'express';
import sayHi from '../controller/userdb';

const dbRoutes = express.Router();
// User Routes
dbRoutes.get('/parcels', sayHi);

export default dbRoutes;
