
/**
 * Collection of nodes, triggers, and variables used to simulate a conversation
 */
class Conversation
{
    /**
     * Creates a new conversation with a name
     */
    constructor({name, nodes=[], keyWords=[], variables=[]})
    {
        this.update({name, nodes, keyWords, variables});
    }

    /**
     * Updates all data in this conversation object
     */
    update({name, nodes, keyWords, variables})
    {
        this.keyWords = keyWords;
        this.name = name;
        this.nodes = nodes.map(p => new ConversationNode(p));
        this.variables = variables.map(p => new Variable(p));
    }

    /**
     * Gets the node with the given name
     */
    getNode(name)
    {
        return this.nodes.find(p => p.name === name);
    }

    /**
     * Gets the variable with the given name
     */
    getVariable(name)
    {
        return this.variables.find(p => p.name === name);
    }
}

/**
 * A name/value pair inferred from conversation
 */
class Variable
{
    constructor({name, value=null})
    {
        this.update({name, value});
    }

    update({name, value})
    {
        this.name = name;
        this.value = value;
    }
}

/**
 * prompts: Set of prompts to give user when they arrive
 * keyWords: Set of keywords that indicate the user should go here
 * text:    What the node 'says' aloud after prompts are complete
 * targets:   Names of nodes that the user can go to next
 */
class ConversationNode
{
    constructor({name, text='', keyWords=[], targets=[], prompts=[], variables=[]})
    {
        this.update({name, text, keyWords, targets, prompts, variables});
    }

    update({name, text, keyWords, targets, prompts, variables})
    {
        this.name = name;
        this.text = text;
        this.keyWords = keyWords;
        this.targets = targets;
        this.prompts = prompts.map(p => new Prompt(p));
        this.variables = variables.map(p => new Variable(p));
    }

    getPrompt(name)
    {
        return this.prompts.find(p => p.name === name);
    }

    getVariable(name)
    {
        return this.variables.find(p => p.name === name);
    }
}

/**
 * text:    What to ask the user
 * target:  Name of the var to store the response in
 */
class Prompt
{
    constuctor({name, text='', target=null})
    {
        this.update({name, text, target});
    }

    update({name, text, target})
    {
        this.name = name;
        this.text = text;
        this.target = target;
    }
}

module.exports = {
    Conversation,
    ConversationNode,
    Prompt,
};
