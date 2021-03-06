import express from 'express';

const landRoute = express.Router();

landRoute.get('/api/v1', (request, response) => {
  response.status(200)
    .json({
      success: true,
      message: "This is dehawk, you're safe here."
    });
});

landRoute.all('*', (request, response) => {
  response.status(404)
    .json({
      success: false,
      message: 'Oops! This page does not exist.'
    });
});

export default landRoute;
