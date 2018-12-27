import express from 'express';
// import bodyParser from 'body-parser';
import landRoute from './srcFolder/routes/landingPage';

// App is a new express instance
const app = express();

// This effectively replaces body-parser see https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express.json() - this is needed to get access to request body

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', landRoute);


const port = process.env.PORT || 5700;

app.listen(port, () => console.log(`Dehawk is live on port ${port}`));

export default app;

// babel will help us compile the code to ES5 that nodejs runtime can understand.
