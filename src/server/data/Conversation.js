
import ConversationNode from './ConversationNode';

/**
 * A conversation object organizes all conversation data into a single storage object
 */
class Conversation
{
    /**
     * Initializes this conversation
     */
    constructor({name, triggers=[], nodes=[], variables=[]})
    {
        this.update({name, triggers, nodes, variables});
    }

    update({name, triggers, nodes, variables})
    {
        this.name = name;
        this.triggers = triggers;
        this.nodes = nodes;
        this.variables = variables;
    }

    /**
     * Adds a new node to this conversation
     */
    addNode(nodeData)
    {
        this.nodes.addNode(new ConversationNode({...nodeData}));
    }

    /**
     * Removes the node from this conversation with the given ID
     */
    removeNode(id)
    {
        this.nodes = this.nodes.filter(x => x.id !== id);
    }
}

module.exports = Conversation;
