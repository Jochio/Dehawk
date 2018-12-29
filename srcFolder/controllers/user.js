import userModel from '../dummyData/userModel';

class userControl {
  static userHandler(request, response) {
    const newUser = {
      id: userModel.length,
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      phone: request.body.phone,
      address: request.body.address,
      password: request.body.password,
    };

    userModel.push(newUser);
    return response.status(201)
      .json({
        message: `Welcome ${newUser.firstName}!`,
        newUser
      });
  }
}

const { userHandler } = userControl;
export default userHandler;
