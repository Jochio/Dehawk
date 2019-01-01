// import uuidv5 from 'uuid/v5';
import objModel from '../dummyData/objModel';
// import userModel from '../dummyData/userModel';

class placeOrderHandler {
  static orderControl(request, response) {
    const {
      email,
      weight,
      parcelContent,
      price,
      quantity,
      pickupAddress,
      senderPhone,
      senderName,
      receiverName,
      destinationAddress,
      receiverPhone

    } = request.body;

    // If delicate return 100 else non-delicate 50
    // const parcelTypeCost = (delicate) => { return (delicate === 'delicate') ? 100 : 50; };
    const presentLocation = 'Jos';
    const total = (quantity * price);
    const status = 'pending';
    const id = objModel.length;
    // const trackingID = uuidv5(`${senderName}${new Date()}${id}`, uuidv5.URL)
    const sendOrder = {
      id,
      email,
      weight,
      parcelContent,
      price,
      quantity,
      pickupAddress,
      senderPhone,
      senderName,
      receiverName,
      destinationAddress,
      receiverPhone,
      status,
      total,
      presentLocation
    };

    objModel.push(sendOrder);
    return response.status(201)
      .json({
        message: 'Your delivery order is booked successfully',
        sendOrder
      });
  }

  static allOrders(request, response) {
    const orders = objModel.reverse();
    return response.status(201)
      .json({
        success: true,
        message: 'All orders',
        orders
      });
  }

  static oneOrder(request, response) {
    const details = request.body;
    return response.status(201)
      .json({
        success: true,
        message: 'Order found',
        details
      });
  }

  static userOrders(request, response) {
    const list = request.body;
    return response.status(200)
      .json({
        success: true,
        message: 'Fetched order!',
        list
      });
  }

  static cancel(request, response) {
    const order = request.body;
    if (order.status === 'Cancelled' || order.status === 'Delivered') {
      response.status(400)
        .json({
          success: true,
          message: 'Order cannot be cancelled at this time!',
        });
    } else {
      order.status = 'Cancelled';
      response.status(200)
        .json({
          success: true,
          message: 'Order updated!',
          order
        });
    }
  }

  static deleted(request, response) {
    const { id } = request.params;
    // const ordersLeft = objModel.filter(orders => orders.id === Number(id));
    const index = objModel.findIndex(x => x.id === Number(id));
    if (index !== -1) {
      const ordersLeft = objModel.splice(index, 1);
      response.status(200)
        .json({
          success: true,
          message: 'This order is deleted!',
          ordersLeft
        });
    } else {
      response.status(404)
        .json({
          success: false,
          message: 'order does not exist'
        });
    }
  }
}

const {
  orderControl, allOrders, oneOrder, userOrders, cancel, deleted
} = placeOrderHandler;

export {
  orderControl, allOrders, oneOrder, userOrders, cancel, deleted
};
