import express from 'express';
// import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import landRoute from './gatewayRoute';
import dummyRoutes from './dummyFolder/routes';
import dbRoutes from './dbFolder/routes';


// App is a new express instance
const app = express();
dotenv.config();
const dehawk = process.env.DB_VARIANT === ('pgDB') ? dbRoutes : dummyRoutes;

// This effectively replaces body-parser see https://stackoverflow.com/questions/47232187/express-json-vs-bodyparser-json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// express.json() - this is needed to get access to request body

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', dehawk);
app.use('/', landRoute);


const port = process.env.PORT || 5700;

app.listen(port, () => console.log(`Dehawk is live on port ${port}`));

export default app;

// babel will help us compile the code to ES5 that nodejs runtime can understand.
