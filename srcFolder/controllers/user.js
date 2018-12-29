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

  static loginHandler(request, response) {
    const {
      email,
      password
    } = request.body;
    const userExist = userModel.find(user => user.email === email);

    if (userExist && (userExist.password === password)) {
      response.status(201)
        .json({
          success: true,
          message: `Welcome back ${email}!`,
        });
    } else {
      response.status(404)
        .json({
          success: false,
          message: 'email or password does not exist',
        });
    }
  }
}

const { userHandler, loginHandler } = userControl;
export { userHandler, loginHandler };
