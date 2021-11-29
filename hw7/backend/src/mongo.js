import mongoose, { mongo } from 'mongoose';
import dotenv from 'dotenv-defaults';

dotenv.config();

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => console.log("mongo db connection created"));

// var db = mongoose.connection;
// db.on("error", (err) => console.log(err));
// db.once("open", async () => {
//     // await deleteDB();
//     await saveUser(57, "Ric");
//     await saveUser(108, "Sandy");
//     await saveUser(77, "Peter"); 
// })

export default db;

// conn1.js
// const config = require('./config');
const mongoose = require('mongoose');

const db = mongoose.createConnection(config.mongodbUri);
require('./decorateModels')(db);

module.exports = db;