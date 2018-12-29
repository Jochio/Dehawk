import userModel from '../dummyData/userModel';

class userControl {
  static userHandler(request, response) {
    const {
      name,
      email,
      phone,
      address,
      password
    } = request.body;
    const id = userModel.length;
    const isUsers = {
      id,
      name,
      email,
      phone,
      address,
      password
    };

    userModel.push(isUsers);
    return response.status(201)
      .json({
        message: `Welcome ${name}!`,
        isUsers
      });
  }
}

const { userHandler } = userControl;
export default userHandler;
