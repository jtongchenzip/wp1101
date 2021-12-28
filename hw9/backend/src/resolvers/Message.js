const Message = {
    sender(parent, args, { db }, info) {
        return db.UserModal.findById(parent.sender);
    },
};

export default Message;