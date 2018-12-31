// import uuidv5 from 'uuid/v5';
// import userModel from '../dummyData/userModel';
import objModel from '../dummyData/objModel';
import userModel from '../dummyData/userModel';

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


  static userOrders(request, response) {
    const { userId } = request.params;
    let user = userModel.find(users => users.id === Number(userId));
    if (user) {
      user = user.email;
      const list = objModel.filter(orders => orders.email === user);
      response.status(200)
        .json({
          success: true,
          message: 'Fetched order!',
          list
        });
    } else {
      response.status(404)
        .json({
          success: false,
          message: 'user order does not exist'
        });
    }
  }

  static update(request, response) {
    const { id } = request.params;
    const order = objModel.find(orders => orders.id === Number(id));
    if (order) {
      order.status = 'In-transit';
      response.status(200)
        .json({
          success: true,
          message: 'Order updated!',
          order
        });
    } else {
      response.status(404)
        .json({
          success: false,
          message: 'order does not exist'
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
  orderControl, userOrders, update, deleted
} = placeOrderHandler;

export {
  orderControl, userOrders, update, deleted
};
