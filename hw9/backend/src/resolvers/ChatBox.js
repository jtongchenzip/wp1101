const ChatBox = {
    messages(parent, args, { db, pub }, info) {
        return Promise.all(
            parent.messages.map((mId) => db.MessageModal.findById(mId))
        );
    },
};

export default ChatBox;