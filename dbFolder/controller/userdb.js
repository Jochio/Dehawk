import { insertUser, queryUsersByEmail } from '../db/queries';
import { hashPassword, verifyPassword } from '../middleware/authentication';
import { getToken } from '../middleware/authorization';
import pool from '../db/dbConnect';

class UserHandler {
  static signupUser(request, response) {
    const {
      firstName, lastName, email, address, phone
    } = request.body;
    const values = [
      firstName,
      lastName,
      email,
      address,
      phone,
      hashPassword(request.body.password, 10)
    ];

    pool.query(insertUser, values)
      .then(data => {
        const user = data.rows[0];
        const token = getToken(user);
        const { name, registered } = user;
        const Details = { name, email, registered };

        return response.status(201)
          .json({
            success: true,
            message: 'Sign up is successful',
            token,
            Details

          });
      })
      .catch(error => response.status(500)
        .json({
          success: false,
          message: error.message
        }));
  }

  static loginUser(request, response) {
    const email = [request.body.email];
    const errors = {};
    pool.query(queryUsersByEmail, email)
      .then(result => {
        if (result.rowCount !== 0) {
          const isPassword = verifyPassword(request.body.password, result.rows[0].password);
          if (isPassword) {
            const user = result.rows[0];
            const username = email[0].split('@')[0];
            const token = getToken(user);
            return response.status(200)
              .json({
                success: true,
                message: `Welcome back ${username}`,
                token
              });
          }

          errors.password = 'Make sure your password is correct';
        }
        if (result.rowCount === 0) {
          errors.email = 'Email is not found, please enter correct email or signup';
        }
        if (JSON.stringify(errors) !== '{}') {
          return response.status(400)
            .json({
              success: false,
              message: 'Please make sure to input correct values',
              errors
            });
        }
      })
      .catch(error => {
        response.json({
          success: false,
          message: error.message
        });
      });
  }
}

const { signupUser, loginUser } = UserHandler;

export { signupUser, loginUser };
