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
    // FILTER will filter out the rest of the objects in the array of
      // objects and return only the needed
      // const userExist = userModel.filter(user => user.email === email);
    // FIND will return only the 'object' that was found
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
