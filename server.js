import express from 'express'
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const port = process.env.PORT || 5700;

app.listen(port, () => console.log(`Dehawk is live on port ${port}`));

export default app;