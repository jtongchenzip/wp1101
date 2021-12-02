import Message from "./models/message";

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
} 

const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
}

const initData = (ws) => {
    Message.find().sort({ 'time': 'asc' }).limit(100)
           .exec((err, res) => {
                if (err) throw err
                sendData(['init', res], ws)
                // console.log(res)
           })
}


export { sendData, sendStatus, initData }
