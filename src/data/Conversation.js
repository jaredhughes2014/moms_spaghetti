
const ConversationNode = require("./ConversationNode");
const ConversationVariable = require("./ConversationVariable");

/**
 * A conversation object organizes all conversation data into a single storage object
 */
class Conversation
{
    /**
     * Initializes this conversation
     */
    constructor(name, triggers=[], nodes=[], variables=[])
    {
        this.name = name;
        this.triggers = triggers;
        this.nodes = nodes;
        this.variables = variables;
    }

    /**
     * Adds a new node to this conversation
     */
    addNode(triggers, response, parent=null)
    {
        this.nodes.push(new ConversationNode(this.nodes.length, parent, triggers, response));
    }

    /**
     * Removes the node from this conversation with the given ID
     */
    removeNode(id)
    {
        this.nodes = this.nodes.filter(x => x.id !== id);
    }

    /**
     * Adds a variable to this conversation
     * @param name
     */
    addVariable(name)
    {
        this.variables.push(new ConversationVariable(name, null));
    }

    /**
     * Gets the variable with the given name
     */
    getVariable(name)
    {
        return this.variables.find(p => p.name === name);
    }

    /**
     * Removes the variable with the given name from this conversation
     */
    removeVariable(name)
    {
        this.variables = this.variables.filter(p => p.name !== name);
    }

    /**
     * Adds a conversation trigger
     */
    addTrigger(text)
    {
        this.triggers.push(text);
    }

    /**
     * Removes a conversation trigger
     */
    removeTrigger(text)
    {
        this.triggers = this.triggers.filter(p => p !== text);
    }
}



module.exports = Conversation;
