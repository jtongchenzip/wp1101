import express from 'express';
import cors from 'cors'
import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv-defaults';
import User from './models/user';
import ScoreCard from './models/ScoreCard';
import cardRoute from './models/routes/card'
import bodyParser from 'body-parser';
// import queryCardsRoute from './models/routes/queryCards'
// import db from './mongo.js'

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
// console.log("here")

// define server
const port = process.env.PORT || 4000
app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})

const deleteDB = async () => {
    try {
        await User.deleteMany({});
        await ScoreCard.deleteMany({});
        console.log("Database deleted");
    }
    catch (e) {
        throw new Error("Database deletion failed");
    }
};

var db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", async () => {
    // await deleteDB();
    // await saveUser(58, "wwRic");
    // await saveUser(108, "Sandy");
    // await saveUser(77, "Peter"); 
    // await saveScoreCard('jtc2', 'English', '100');
})