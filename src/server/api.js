
const Database = require("./Database");
let db = new Database();

// All API endpoints should respond via onComplete in case we ever hook up a DBMS

/**
 * Gets all conversations from the database
 */
const getConversations = (onComplete) =>
{
    onComplete(db.conversations);
};

/**
 * Adds a new conversation to the database. Returns the newly created
 * conversation object
 */
const addConversation = (name, onComplete) =>
{
    onComplete(db.addConversation(name));
};

/**
 * Removes a conversation. Returns a confirmation that the operation was performed
 * successfully
 */
const removeConversation = (name, onComplete) =>
{
    db.removeConversation(name);
    onComplete({success: true});
};

/**
 * Saves the current conversation with the data in the provided object
 */
const saveConversation = (conversation, onComplete) =>
{
    let response = db.saveConversation(conversation);
    onComplete(response);
};


module.exports = {
    getConversations,
    addConversation,
    removeConversation,
    saveConversation
};
