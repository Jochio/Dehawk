import express from 'express';
import {
  orderControl, allOrders, oneOrder, userOrders, cancel, deleted
} from '../controllers/orders';
import { orderHelper, getOrderHelper, userOrderHelper } from '../middlewares/orderWare';

const orderRoute = express.Router();

orderRoute.post('/placeOrder', orderHelper, orderControl);
orderRoute.get('/parcels', allOrders);
orderRoute.get('/parcels/:id', getOrderHelper, oneOrder);
orderRoute.get('/users/:userId/parcels', userOrderHelper, userOrders);
orderRoute.put('/parcels/:id/cancel', getOrderHelper, cancel);
orderRoute.delete('/parcels/:id/delete', deleted);


export default orderRoute;
