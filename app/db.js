
const data = require("./data");


/*
This is really shitty database simulation since databases in AWS are hard to set up
and expensive to run
 */

let conversations = [];

/**
 * Sends a warning message. Other data can be included as well
 */
const warn = (message, onComplete, data={}) =>
{
    onComplete(Object.assign({}, data, {warning: message}));
};

/**
 * Sends an error message
 */
const err = (message, onComplete) =>
{
    onComplete({error: message});
};

/**
 * Adds a conversation to the database. Returns the names of all conversations
 * currently in the database
 */
const addConversation = (name, onComplete) =>
{
    let duplicate = false;
    if (!conversations.find(p => p.name == name)) {
        conversations.push(new data.Conversation({name}));
        duplicate = true;
    }

    const response = {conversations: conversations.map(p => p.name)};

    if (duplicate) {
        onComplete(response)
    }
    else {
        warn("Conversation already exists", onComplete, response);
    }
};

/**
 * Removes the conversation with the given name and returns the
 * modified list of conversations
 */
const removeConversation = (name, onComplete) =>
{
    conversations = conversations.filter(p => p.name !== name);
    onComplete({conversations});
};

/**
 * Gets the conversation with the given name
 */
const getConversation = (name, onComplete) =>
{
    let conversation = conversations.find(p => p.name === name);

    if (!conversation) {
        warn(`No conversation named ${name} exists`, onComplete, {conversation: null});
    }
    else {
        onComplete({conversation});
    }
};

/**
 * Gets the names of all conversations in the database
 */
const getConversationNames = (onComplete) =>
{
    onComplete({conversations: conversations.map(p => p.name)});
};

/**
 * Updates the name of a conversation and returns that conversation
 */
const updateConversationName = (oldName, newName, onComplete) =>
{
    let conversation = conversations.find(p => p.name == oldName);

    if (conversation) {
        conversation.name = newName;
        onComplete({conversation});
    }
    else {
        warn(`No conversation named ${oldName} exists`, onComplete, {conversation: null});
    }
};

/**
 * Adds a node to a conversation
 */
const addConversationNode = (conversationName, nodeName, onComplete) =>
{
    let conversation = conversations.find(p => p.name == conversationName);

    if (conversation) {

        let duplicate = conversation.nodes.find(p => p.name == nodeName) !== undefined;
        if (!duplicate) {
            conversation.nodes.push(new data.ConversationNode({name: nodeName, text: 'New Node'}));
        }
        if (duplicate) {
            warn(`Node named ${nodeName} already exists in ${conversationName}`, onComplete, {nodes: conversation.nodes});
        }
        else {
            onComplete({nodes: conversation.nodes});
        }
    }
    else {
        warn(`No conversation named ${conversationName} exists`, onComplete, {nodes: []});
    }
};

const removeConversationNode = (conversationName, nodeName, onComplete) =>
{
    let conversation = conversations.find(p => p.name == conversationName);

    if (conversation) {
        conversation.nodes = conversation.nodes.filter(p => p.name !== nodeName);
        onComplete({nodes: conversation.nodes});
    }
    else {
        warn(`No conversation named ${conversationName} exists`, onComplete, {nodes: []});
    }
};

const addConversationTrigger = (conversationName, triggerName, onComplete) =>
{
    getConversation(conversationName, (response) => {
        const {conversation} = response;

        if (conversation) {

            let duplicate = conversation.triggers.find(p => p == triggerName) !== undefined;
            if (!duplicate) {
                conversation.triggers.push(triggerName);
            }
            if (duplicate) {
                warn(`Trigger named ${triggerName} already exists in ${conversationName}`, onComplete, {triggers: conversation.triggers});
            }
            else {
                onComplete({triggers: conversation.triggers});
            }
        }
        else {
            warn(`No conversation named ${conversationName} exists`, onComplete, {triggers: []});
        }
    });
};

const removeConversationTrigger = (conversationName, triggerName, onComplete) =>
{
    getConversation(conversationName, (response) => {
        const {conversation} = response;

        if (conversation) {
            conversation.triggers = conversation.triggers.filter(p => p != triggerName);
            onComplete({triggers: conversation.triggers});
        }
        else {
            warn(`No conversation named ${conversationName} exists`, onComplete, {triggers: []})
        }
    });
};

const addConversationVariable = (conversationName, variablesName, onComplete) =>
{
    getConversation(conversationName, (response) => {
        const {conversation} = response;

        if (conversation) {

            let duplicate = conversation.variables.find(p => p.name == variablesName) !== undefined;

            if (!duplicate) {
                conversation.variables.push(new data.Variable({name: variablesName}));
            }

            if (duplicate) {
                warn(`Variable named ${variablesName} already exists in ${conversationName}`, onComplete, {variables: conversation.variables});
            }
            else {
                onComplete({variables: conversation.variables});
            }
        }
        else {
            warn(`No conversation named ${conversationName} exists`, onComplete, {variables: []});
        }
    });
};

const removeConversationVariable = (conversationName, variableName, onComplete) =>
{
    getConversation(conversationName, (response) => {
        const {conversation} = response;

        if (conversation) {
            conversation.variables = conversation.variables.filter(p => p.name !== variableName);
            onComplete({variables: conversation.variables});
        }
        else {
            warn(`No conversation named ${conversationName} exists`, onComplete, {variables: []})
        }
    });
};

/*
 * Sets the node's name
 */
const updateNodeName = ({conversationName, nodeName, newName}, onComplete) => {
    getConversation(conversationName, (ret) => {
        const conversation = ret.conversation;
        if (!conversation) {
            onComplete(ret);
            return;
        }
        const node = conversation.getNode(nodeName);
        if (!node) {
            warn(`Can't find node $(nodeName).`, onComplete, {node: null});
            return;
        }

        node.name = newName;

        // Rename all targets so they are pointing to the correct node
        for (let i = 0; i < conversation.nodes.length; ++i) {
            let n = conversation.nodes[i];
            n.targets = n.targets.map(p => (p === nodeName) ? newName : p);
        }
        onComplete({node});
    });
};

/*
 * Gets the requested node
 */
const updateNodeText = ({conversationName, nodeName, text}, onComplete) => {
    getConversation(conversationName, (ret) => {
        const conversation = ret.conversation;
        if (!conversation) {
            onComplete(ret);
            return;
        }
        const node = conversation.getNode(nodeName);
        if (!node) {
            warn(`Can't find node $(nodeName).`, onComplete, {node: null});
            return;
        }
        node.text = text;
        onComplete({node});
    });
};

/**
 * Updates the x and y coordinate of the given nodes. Used by the editor only
 */
const updateNodePosition = ({conversationName, nodeName, x, y}, onComplete) =>
{
    getConversation(conversationName, (response) => {
        const {conversation} = response;

        if (conversation) {
            let node = conversation.nodes.find(p => p.name == nodeName);

            if (node) {
                node.x = x;
                node.y = y;

                onComplete({nodes: conversation.nodes});
            }
            else {
                warn(`No node named ${nodeName} in conversation ${conversationName} exists`, onComplete, {nodes: conversation.nodes});
            }
        }
        else {
            warn(`No conversation named ${conversationName} exists`, onComplete, {nodes: []});
        }
    })
};

/*
 * Gets the requested node
 */
const getNode = ({conversationName, nodeName}, onComplete) => {
    getConversation(conversationName, (ret) => {
        const conversation = ret.conversation;
        if (!conversation) {
            onComplete(ret);
            return;
        }
        const node = conversation.getNode(nodeName);
        if (!node) {
            warn(`Can't find node $(nodeName).`, onComplete, {node: null});
            return;
        }
        onComplete({node});
    });
};

/*
 * Adds the given prompt
 */
const addPrompt = ({conversationName, nodeName, promptName}, onComplete) => {
    getNode({conversationName, nodeName}, (response) => {
        const {node} = response;
        if (node) {
            if (!node.prompts.find(p => p.name == promptName)) {
                node.prompts.push(new data.Prompt({name: promptName}));
                onComplete({prompts: node.prompts});
            }
            else {
                warn(`${promptName} already exists in ${nodeName}`, onComplete, {prompts: node.prompts});
            }
        }
        else {
            warn(`Unable to find node named ${nodeName} in conversation ${conversationName}`, onComplete, {prompts: []});
        }
    });
};

/*
 * Removes the given prompt
 */
const removePrompt = ({conversationName, nodeName, promptName}, onComplete) => {
    getNode({conversationName, nodeName}, (response) => {
        const {node} = response;

        if (node) {
            node.prompts = node.prompts.filter(p => p.name !== promptName);
            onComplete({prompts: node.prompts});
        }
        else {
            onComplete(response);
        }
    });
};

/*
 * Updates the given prompt
 */
const updatePrompt = ({conversationName, nodeName, promptName, promptText, variableSet}, onComplete) => {
    getNode({conversationName, nodeName}, (response) => {
        const {node} = response;

        if (node) {
            const prompt = node.prompts.find(p => p.name === promptName);

            if (prompt) {
                prompt.name = promptName;
                prompt.text = promptText;
                prompt.target = variableSet;

                onComplete({prompts: node.prompts});
            }
            else {
                warn(`No prompt named ${promptName} exists in ${nodeName}`, onComplete, {prompts: node.prompts});
            }
        }
        else {
            onComplete(response);
        }
    })
};

/*
 * Adds the given key word
 */
const addKeyWord = ({conversationName, nodeName, keyWord}, onComplete) => {
    getConversation(conversationName, (ret) => {
        const conversation = ret.conversation;
        if (!conversation) {
            onComplete(ret);
            return;
        }
        const node = conversation.getNode(nodeName);
        if (!node) {
            warn(`Can't find node $(nodeName).`, onComplete, {keyWords: []});
            return;
        }
        const keyWords = node.keyWords;
        if (keyWords.indexOf(keyWord) != -1) {
            warn(`Key word ${keyWord} already exists.`, onComplete, {keyWords});
            return;
        }
        keyWords.push(keyWord);
        onComplete({keyWords});
    });
};

/*
 * Removes the given key word
 */
const removeKeyWord = ({conversationName, nodeName, keyWord}, onComplete) => {
    getConversation(conversationName, (ret) => {
        const conversation = ret.conversation;
        if (!conversation) {
            onComplete(ret);
            return;
        }
        const node = conversation.getNode(nodeName);
        if (!node) {
            warn(`Can't find node $(nodeName).`, onComplete, {keyWords: []});
            return;
        }
        const keyWords = node.keyWords;
        const ix = keyWords.indexOf(keyWord);
        if (ix == -1) {
            warn(`No key word named ${keyWord} exists.`, onComplete, {keyWords});
            return;
        }
        keyWords.splice(ix, 1);
        onComplete({keyWords});
    });
};

/*
 * Adds the given target
 */
const addTarget = ({conversationName, nodeName, targetName}, onComplete) => {
    getConversation(conversationName, (response) => {
        const {conversation} = response;

        if (conversation) {
            const node = conversation.nodes.find(p => p.name === nodeName);

            if (node) {
                node.targets.push(targetName);
                onComplete({nodes: conversation.nodes});
            }
            else {
                warn(`No node in conversation ${conversationName} found named ${nodeName}`, onComplete, {nodes: conversation.nodes});
            }
        }
        else {
            warn(`No conversation found named ${conversationName}`, onComplete, {nodes: []});
        }
    });
};

/*
 * Removes the given target
 */
const removeTarget = ({conversationName, nodeName, targetName}, onComplete) => {
    getConversation(conversationName, (response) => {
        const {conversation} = response;

        if (conversation) {
            const node = conversation.nodes.find(p => p.name === nodeName);

            if (node) {
                node.targets = node.targets.filter(p => p !== targetName);
                onComplete({nodes: conversation.nodes});
            }
            else {
                warn(`No node in conversation ${conversationName} found named ${nodeName}`, onComplete, {nodes: conversation.nodes});
            }
        }
        else {
            warn(`No conversation found named ${conversationName}`, onComplete, {nodes: []});
        }
    });
};

module.exports = {
    addConversation,
    removeConversation,
    getConversation,
    getConversationNames,
    updateConversationName,
    addConversationNode,
    removeConversationNode,
    addConversationVariable,
    removeConversationVariable,
    addConversationTrigger,
    removeConversationTrigger,
    updateNodeName,
    updateNodeText,
    getNode,
    addPrompt,
    removePrompt,
    updatePrompt,
    addKeyWord,
    removeKeyWord,
    addTarget,
    removeTarget,
    updateNodePosition,
};
