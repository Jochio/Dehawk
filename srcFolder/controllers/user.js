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
    const { firstName } = request.body;
    return response.status(201)
      .json({
        success: true,
        message: `Welcome back ${firstName}!`,
      });
  }

  static allUsers(request, response) {
    const users = userModel.reverse();
    return response.status(201)
      .json({
        success: true,
        message: 'All users',
        users
      });
  }

  static oneUser(request, response) {
    const { id } = request.params;
    const userExist = userModel.find(user => user.id === Number(id));
    // Putting 'Number' ensures what is received from params is an integer, this avoids 'undefined'.
    console.log(userExist);
    if (userExist) {
      response.status(201)
        .json({
          success: true,
          message: 'User found',
          userExist
        });
    } else {
      response.status(404)
        .json({
          success: false,
          message: 'User not found'
        });
    }
  }
}

const {
  userHandler, loginHandler, allUsers, oneUser
} = userControl;
export {
  userHandler, loginHandler, allUsers, oneUser
};
