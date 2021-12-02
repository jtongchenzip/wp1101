import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import dotenv from 'dotenv-defaults';
import bodyParser from 'body-parser';
import WebSocket from 'ws';
import http from 'http';
import Message from './models/message';
import { sendData, sendStatus, initData } from './wssConnect';

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

const server = http.createServer(app);
const wss = new WebSocket.Server( { server });
const port = process.env.PORT;
const db = mongoose.connection;

const broadcastMessage = (data, status) => {
    wss.clients.forEach((client) => {
        sendData(data, client);
        sendStatus(status, client);
    });
};

db.once('open', () => {
    wss.on('connection', (ws) => {
        initData(ws)
        ws.onmessage = async (byteString) => {
            const { data } = byteString
            const [task, payload] = JSON.parse(data)
            switch(task) {
                case 'input': {
                    console.log(payload)
                    const { name, body } = payload
                    const newMessage = new Message( {name, body} )
                    try {
                        await newMessage.save();
                    }
                    catch (e) {
                        throw new Error("Message DB save error" + e);
                    }
                    broadcastMessage( ['output', [payload]], { type: 'success', msg: 'Message sent.'} )
                    break
                }
                case 'clear': {
                    Message.deleteMany({}, () => {
                        broadcastMessage( ['cleared'], { type: 'info', msg: 'Message cache cleared'} )
                    })
                    break
                }
                default: break
            }
        }  
    })

    server.listen(port, () => {
        console.log(`Listening on http://localhost:${port}.`)
    })
})
