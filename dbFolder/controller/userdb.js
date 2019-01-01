const sayHi = (request, response) => {
  return response.status(200)
    .json({
      message: 'Hi this is real database'
    });
};

export default sayHi;
