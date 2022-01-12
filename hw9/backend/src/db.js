import mongoose, { mongo } from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
});

const chatBoxSchema = new Schema({
  name: {type: String, required: true},
  messages: [{type: mongoose.Types.ObjectId, ref: "Message"}],
})

const messageSchema = new Schema({
  sender: {type: mongoose.Types.ObjectId, ref: "User"},
  body: {type: String, required: true},
});

const UserModal = mongoose.model("User", userSchema);
const ChatBoxModal = mongoose.model("ChatBox", chatBoxSchema);
const MessageModal = mongoose.model("Message", messageSchema);

export { UserModal, ChatBoxModal, MessageModal }