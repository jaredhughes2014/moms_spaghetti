
const Conversation = require("./Conversation");

/**
 * Totally a real database. Totally.
 */
class Database
{
    /**
     * Creates a new "real" database
     */
    constructor()
    {
        this.conversations = [];
    }

    /**
     * Adds a new blank conversation to this database
     */
    addConversation(name)
    {
        let conversation = new Conversation(name);
        this.conversations.push(conversation);

        return conversation;
    }

    /**
     * Removes the conversation with the given name
     */
    removeConversation(name)
    {
        this.conversations = this.conversations.filter(p => p.name !== name);
    }

    /**
     * Gets the conversation with the given name
     */
    getConversation(name)
    {
        let matches = this.conversations.filter(p => p.name === name);
        return matches.length > 0 ? matches[0] : {};
    }
}

module.exports = Database;