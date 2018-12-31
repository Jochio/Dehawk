import express from 'express';
import {
  orderControl, userOrders, update, deleted
} from '../controllers/orders';

const orderRoute = express.Router();

orderRoute.post('/placeOrder', orderControl);
orderRoute.get('/users/:userId/parcels', userOrders);
orderRoute.put('/parcels/:id/cancel', update);
orderRoute.delete('/parcels/:id/delete', deleted);


export default orderRoute;
