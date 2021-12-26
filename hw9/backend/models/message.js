import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const MessageSchema = new Schema ({
    name: {
        type: String,
        required: [true, 'Name field is required.']
    },
    body: {
        type: String,
        required: [true, 'Body field is required.']
    },
    time : { 
        type : Date, 
        default: Date.now 
    }
})

const Message = mongoose.model('message', MessageSchema)

export default Message;