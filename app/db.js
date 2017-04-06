
const data = require("./data");


/*
This is really shitty database simulation since databases in AWS are hard to set up
and expensive to run
 */

let conversations = [];

/**
 * Sends a warning message
 */
const warn = (message, onComplete) =>
{
    onComplete({warning: message});
};

/**
 * Sends an error message
 */
const err = (message, onComplete) =>
{
    onComplete({error: message});
};


/**
 * Generates a new conversation with the given name
 */
const newConversation = (name, onComplete) =>
{
    getConversation(name, (c) => {
        if (c.conversation) {
            warn("Conversation already exists", onComplete);
        }
        else {
            let c = new data.Conversation(name);
            conversations.push(c);
            onComplete({conversation: c});
        }
    });
};

/**
 * Gets the conversation with the given name
 */
const getConversation = (name, onComplete) =>
{
    let conversation = conversations.find(p => p.name === name);

    if (conversation) {
        onComplete({conversation})
    }
    else {
        warn('No conversation named ' + name + ' exists', onComplete);
    }
};

/**
 * Gets the names of all conversations in the database
 */
const conversationNames = (onComplete) =>
{
    onComplete({conversations: conversations.map(p => p.name)});
};

module.exports = {
    newConversation,
    getConversation,
    conversationNames,
};