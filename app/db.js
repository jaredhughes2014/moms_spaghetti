
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
const newConversation = (conv, onComplete) =>
{
    getConversation(conv.name, (c) => {
        if (c.conversation) {
            warn("Conversation already exists", onComplete);
        }
        else {
            let c = new data.Conversation(conv);
            conversations.push(c);
            conversationNames(onComplete);
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

/**
 * Saves the given conversation into the database
 */
const saveConversation = (conversation, onComplete) =>
{
    getConversation(conversation.name, (c) => {
        if (c) {
            c.update(conversation);
            onComplete({success: true});
        }
        else {
            warn(`No conversation named ${conversation.name} exists`, onComplete);
        }
    });
};

module.exports = {
    newConversation,
    getConversation,
    conversationNames,
    saveConversation,
};
