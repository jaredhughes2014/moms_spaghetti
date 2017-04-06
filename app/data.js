
/**
 * Collection of nodes, triggers, and variables used to simulate a conversation
 */
class Conversation
{
    /**
     * Creates a new conversation with a name
     * @param name
     */
    constructor(obj)
    {
        this.update(obj);
    }

    /**
     * Updates all data in this conversation object
     */
    update({name, nodes, init_phrases})
    {
        this.init_phrases = init_phrases;
        this.name = name;
        this.nodes = [];
        if (nodes)
        {
            for (let n of nodes)
            {
                this.nodes.push(new Conv_Node(n));
            }
        }
    }
}

/**
 * prompts: Set of prompts to give user when they arrive
 * key_words: Set of keywords that indicate the user should go here
 * text:    What the node 'says' aloud after prompts are complete
 * links:   Indices of nodes that the user can go to next
 */
class Conv_Node
{
    constructor(obj)
    {
        this.update(obj);
    }

    update({text, key_words, links, prompts})
    {
        this.text = text;
        this.key_words = key_words;
        this.links = links
        this.prompts = [];
        if (prompts)
        {
            for (let p of prompts)
            {
                this.prompts.push(new Prompt(p));
            }
        }
    }
}

/**
 * text:    What to ask the user
 * target:  Name of the var to store the response in
 */
class Prompt
{
    constuctor(obj)
    {
        this.update(obj);
    }

    update({text, target})
    {
        this.text = text;
        this.target = target;
    }
}

module.exports = {
    Conversation,
    Conv_Node,
    Prompt,
};
