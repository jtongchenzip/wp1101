const makeName = (name1, name2) => {
    return [name1, name2].sort().join("_");
};

// return found user (can be null)
const checkUser = (db, name, errFunc) => {
    if(!name)
        throw new Error("Missing User name for " + errFunc);
    
    return db.UserModal.findOne({ name });
};

// return found chatBox (can be null)
const checkChatBox = (db, chatBoxName, errFunc) => {
    if(!chatBoxName)
        throw new Error("Missing chatBox name for " + errFunc);
    
    return db.ChatBoxModal.findOne({ name: chatBoxName });
};

// Make sure (from, to) users and chatBox have been created
// return found { chatBox, sender } (can be null)
const checkMessage = async (db, from, to, message, errFunc) => {
    const chatBoxName = makeName(from, to);
    return {
        chatBox: await checkChatBox(db, chatBoxName, errFunc),
        sender: await checkUser(db, from, errFunc),
        to: await checkUser(db, to, errFunc),
    };
};

// make sure calling checkUser beforehand
const newUser = (db, name) => {
    return new db.UserModal({ name }).save();
};

// make sure calling checkMessage beforehand
const newMessage = (db, sender, body) => {
    return new db.MessageModal({ sender, body }).save();
};

const newChatBox = (db, chatBoxName) => {
    return new db.ChatBoxModal({ name: chatBoxName }).save();
};

export {
    makeName,
    checkUser,
    checkChatBox,
    checkMessage,
    newUser,
    newMessage,
    newChatBox,
};