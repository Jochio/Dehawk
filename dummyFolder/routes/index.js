import express from 'express';
import {
  userHandler, loginHandler, allUsers, oneUser
} from '../controllers/user';
import { signupHelper, loginHelper, getUserHelper } from '../middlewares/userWare';
import {
  orderControl, allOrders, oneOrder, userOrders, cancel, deleted
} from '../controllers/orders';
import { orderHelper, getOrderHelper, userOrderHelper } from '../middlewares/orderWare';

const dummyRoutes = express.Router();
// User Routes
dummyRoutes.post('/signup', signupHelper, userHandler);
dummyRoutes.post('/login', loginHelper, loginHandler);
dummyRoutes.get('/users', allUsers);
dummyRoutes.get('/users/:id', getUserHelper, oneUser);

// Order Routes
dummyRoutes.post('/placeOrder', orderHelper, orderControl);
dummyRoutes.get('/parcels', allOrders);
dummyRoutes.get('parcels/:id', getOrderHelper, oneOrder);
dummyRoutes.get('/users/:userId/parcels', userOrderHelper, userOrders);
dummyRoutes.put('/parcels/:id/cancel', getOrderHelper, cancel);
dummyRoutes.delete('//parcels/:id/delete', deleted);


export default dummyRoutes;
