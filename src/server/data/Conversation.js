/**
 * A conversation object organizes all conversation data into a single storage object
 */
class Conversation
{
    /**
     * Initializes this conversation
     */
    constructor(name)
    {
        this.name = name;
        this.triggers = [];
        this.nodes = [];
        this.variables = [];

        this.previousNode = -1;
    }

    /**
     * Adds a new node to this conversation
     */
    addNode(triggers, response, parent=null)
    {
        this.nodes.addNode(this.nodes.length, parent, triggers, response);
    }

    /**
     * Removes the node from this conversation with the given ID
     */
    removeNode(id)
    {
        this.nodes = this.nodes.filter(x => x.id !== id);
    }
}

/**
 * Conversation nodes are logical steps in a conversation
 */
class ConversationNode
{
    /**
     * Creates a new Conversation Node
     */
    constructor(id, parent, triggers, response)
    {
        this.id = id;
        this.parent = parent;
        this.triggers = triggers.map(p => p);
        this.response = response;

        this.children = [];
    }
}

module.exports = Conversation;
