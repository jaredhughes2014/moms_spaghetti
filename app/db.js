
const data = require("./data");


/*
This is really shitty database simulation since databases in AWS are hard to set up
and expensive to run
 */

let conversations = [];

/**
 * Sends a warning message. Other data can be included as well
 */
const warn = (message, onComplete, data={}) =>
{
    onComplete(Object.assign({}, data, {warning: message}));
};

/**
 * Sends an error message
 */
const err = (message, onComplete) =>
{
    onComplete({error: message});
};

/**
 * Adds a conversation to the database. Returns the names of all conversations
 * currently in the database
 */
const addConversation = (name, onComplete) =>
{
    let duplicate = false;
    if (!conversations.find(p => p.name == name)) {
        conversations.push(new data.Conversation({name}));
        duplicate = true;
    }

    console.log(conversations);

    const response = {conversations: conversations.map(p => p.name)};
    if (duplicate) {
        onComplete(response)
    }
    else {
        warn("Conversation already exists", onComplete, response);
    }
};

/**
 * Removes the conversation with the given name and returns the
 * modified list of conversations
 */
const removeConversation = (name, onComplete) =>
{
    conversations = conversations.filter(p => p.name !== name);
    onComplete({conversations});
};

/**
 * Gets the conversation with the given name
 */
const getConversation = (name, onComplete) =>
{
    let conversation = conversations.find(p => p.name === name);

    if (!conversation) {
        warn(`No conversation named ${name} exists`, onComplete, {conversation: null});
    }
    else {
        onComplete({conversation});
    }
};

/**
 * Gets the names of all conversations in the database
 */
const getConversationNames = (onComplete) =>
{
    onComplete({conversations: conversations.filter(p => p.name)});
};

/**
 * Updates the name of a conversation and returns that conversation
 */
const updateConversationName = (oldName, newName, onComplete) =>
{
    let conversation = conversations.find(p => p.name == oldName);

    if (conversation) {
        conversation.name = newName;
        onComplete({conversation});
    }
    else {
        warn(`No conversation named ${oldName} exists`, onComplete, {conversation: null});
    }
};

module.exports = {
    addConversation,
    removeConversation,
    getConversation,
    getConversationNames,
    updateConversationName,
};
