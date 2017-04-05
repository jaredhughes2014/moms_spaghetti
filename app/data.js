
/**
 * Collection of nodes, triggers, and variables used to simulate a conversation
 */
class Conversation
{
    /**
     * Creates a new conversation with a name
     * @param name
     */
    constructor(name)
    {
        this.update(name);
    }

    /**
     * Updates all data in this conversation object
     */
    update({name})
    {
        this.m_name = name;
    }

    /**
     * The name of the conversation
     */
    get name() { return this.m_name; }
    set name(val) { this.m_name = val; }
}

module.exports = {
    Conversation,
};