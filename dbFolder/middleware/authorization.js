import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const getToken = payload => {
  const token = jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return token;
};

const verifyToken = (request, response, next) => {
  const token = request.headers.authorization || request.body.token || request.query.token;
  if (!token) {
    return response.status(403)
      .json({
        success: false,
        message: 'No token provided',
      });
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, authData) => {
    if (error) {
      if (error.message.includes('signature')) {
        return response.status(403)
          .json({
            success: false,
            message: 'Unauthorized access, supply a valid token.',
          });
      }
    }
    request.authData = authData;
    return next();
  });
};

const adminPass = (request, response, next) => {
  const userInfo = request.authData.payload;
  if (userInfo.isadmin === false) {
    return response.status(401)
      .json({
        success: false,
        message: 'Unauthorized access, admin privilege is needed.'
      });
  }
  next();
};

export {
  getToken, verifyToken, adminPass
};
