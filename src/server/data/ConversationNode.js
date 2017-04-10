/**
 * Conversation nodes are logical steps in a conversation
 */
class ConversationNode
{
    /**
     * Creates a new Conversation Node
     */
    constructor({id, parent, triggers, response}) {
        this.id = id;
        this.parent = parent;
        this.triggers = triggers;
        this.response = response;

        this.children = [];
    }
}

module.exports = ConversationNode;