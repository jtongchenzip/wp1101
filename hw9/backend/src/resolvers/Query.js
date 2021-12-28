import { checkUser, makeName, checkChatBox, checkMessage } from './utility';


const Query = {
  queryChatBox(parent, { name1, name2 }, { db }, info) {
    const chatBoxName = makeName(name1, name2);
    let chatBox = checkChatBox(db, chatBoxName)
    return chatBox;
  },
  queryUser(parent, { name }, { db }, info) {
    return checkUser(db, name);
  },
};

export { Query as default };
