import express from 'express';
import cors from 'cors'
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv-defaults';
import cardRoute from './models/routes/card'
import bodyParser from 'body-parser';

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));

const app = express();

// init middleware
app.use(cors())
app.use(bodyParser.json());

// define routes
app.use('/api', cardRoute)

// define server
const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})
