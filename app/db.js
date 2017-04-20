
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
    console.log(response);

    if (duplicate) {
        onComplete(response)
        return;
    }
    else {
        warn("Conversation already exists", onComplete, response);
        return;
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
        return;
    }
    else {
        onComplete({conversation});
        return;
    }
};

/**
 * Returns the conversation that has the highest number of keywords matched,
 * or null if no keywords are matched
 */
const getConversationByKeywords = ({phrase}, onComplete) =>
{
    let score = 0;
    let ret = null;
    for (let c of conversations)
    {
        let s = 0;
        for (let kw of c.keyWords)
        {
            if (phrase.includes(kw)) s++;
        }
        if (s > score)
        {
            score = s;
            ret = c;
        }
    }
    if (!ret)
    {
        warn('No converation matching given keywords found', onComplete, {conversation: null});
        return;
    }
    onComplete({conversation: ret});
    return;
}

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
        return;
    }
    else {
        warn(`No conversation named ${oldName} exists`, onComplete, {conversation: null});
        return;
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
            conversation.nodes.push(new data.ConversationNode({name: nodeName}));
        }
        if (duplicate) {
            warn(`Node named ${nodeName} already exists in ${conversationName}`, onComplete, {nodes: conversation.nodes});
            return;
        }
        else {
            onComplete({nodes: conversation.nodes});
            return;
        }
    }
    else {
        warn(`No conversation named ${conversationName} exists`, onComplete, {nodes: []});
        return;
    }
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
        onComplete({node});
        return;
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
        return;
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
                return;
            }
            else {
                warn(`No node named ${nodeName} in conversation ${conversationName} exists`, onComplete, {nodes: []});
                return;
            }
        }
        else {
            warn(`No conversation named ${conversationName} exists`, onComplete, {nodes: []});
            return;
        }
    })
};

/*
 * Gets the requested node
 */
const getNode = ({conversationName, nodeName}, onComplete) => {
    getConversation(conversationName, ({conversation}) => {
        if (!conversation) {
            warn(`Can't find conversation $(conversationName).`, onComplete, {node: null});
            return;
        }
        const node = conversation.getNode(nodeName);
        if (!node) {
            warn(`Can't find node $(nodeName).`, onComplete, {node: null});
            return;
        }
        onComplete({node});
        return;
    });
};

/**
 * Gets a node given the parent and the phrase.
 * Returns null if none of the keywords of any of the children are matched.
 */
const getNodeByKeywords = ({conversationName, nodeName, phrase}, onComplete) =>
{
    getConversation(conversationName, ({conversation}) =>
    {
        if (!conversation) {
            warn(`Can't find conversation $(conversationName).`, onComplete, {node: null});
            return;
        }
        const node = conversation.getNode(nodeName);
        if (!node) {
            warn(`Can't find node $(nodeName).`, onComplete, {node: null});
            return;
        }
        let score = 0;
        let ret = null;
        for (let n of conversation.nodes)
        {
            if (!node.targets.includes(n.name)) continue;
            let s = 0;
            for (let kw of n.keyWords)
            {
                if (phrase.includes(kw)) s++;
            }
            if (s > score)
            {
                score = s;
                ret = n;
            }
        }
        if (!ret)
        {
            warn('No children matching given keywords found', onComplete, {node: null});
            return;
        }
        onComplete({node: ret});
        return;
    });
}

/*
 * Adds the given prompt
 */
const addPrompt = ({conversationName, nodeName, promptName}, onComplete) => {
    getConversation(conversationName, (ret) => {
        const conversation = ret.conversation;
        if (!conversation) {
            onComplete(ret);
            return;
        }
        const node = conversation.getNode(nodeName);
        if (!node) {
            warn(`Can't find node $(nodeName).`, onComplete, {prompts: []});
            return;
        }
        const prompts = node.prompts;
        if (node.getPrompt(promptName)) {
            warn(`Prompt ${promptName} already exists.`, onComplete, {prompts});
            return;
        }
        prompts.push(new Prompt(promptName));
        onComplete({prompts});
        return;
    });
};

/*
 * Removes the given prompt
 */
const removePrompt = ({conversationName, nodeName, promptName}, onComplete) => {
    getConversation(conversationName, (ret) => {
        const conversation = ret.conversation;
        if (!conversation) {
            onComplete(ret);
            return;
        }
        const node = conversation.getNode(nodeName);
        if (!node) {
            warn(`Can't find node $(nodeName).`, onComplete, {prompts: []});
            return;
        }
        const prompts = node.prompts;
        const ix = prompts.findIndex(p => p.name === promptName);
        if (ix == -1) {
            warn(`No prompt named ${promptName} exists.`, onComplete, {prompts});
            return;
        }
        prompts.splice(ix, 1);
        onComplete({prompts});
        return;
    });
};

/*
 * Updates the given prompt
 */
const updatePrompt = ({conversationName, nodeName, promptName, promptText, variableSet}, onComplete) => {
    getConversation(conversationName, (ret) => {
        const conversation = ret.conversation;
        if (!conversation) {
            onComplete(ret);
            return;
        }
        const node = conversation.getNode(nodeName);
        if (!node) {
            warn(`Can't find node $(nodeName).`, onComplete, {prompts: []});
            return;
        }
        const prompts = node.prompts;
        const p = node.getPrmopt(promptName);
        if (!p) {
            warn(`No prompt named ${promptName} exists.`, onComplete, {prompts});
            return;
        }
        p.update({name: promptName, text: promptText, target: variableSet});
        onComplete({prompts});
        return;
    });
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
        return;
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
        return;
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
                return;
            }
            else {
                warn(`No node in conversation ${conversationName} found named ${nodeName}`, onComplete, {nodes: conversation.nodes});
                return;
            }
        }
        else {
            warn(`No conversation found named ${conversationName}`, onComplete, {nodes: []});
            return;
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
                return;
            }
            else {
                warn(`No node in conversation ${conversationName} found named ${nodeName}`, onComplete, {nodes: conversation.nodes});
                return;
            }
        }
        else {
            warn(`No conversation found named ${conversationName}`, onComplete, {nodes: []});
            return;
        }
    });
};

module.exports = {
    addConversation,
    removeConversation,
    getConversation,
    getConversationByKeywords,
    getConversationNames,
    updateConversationName,
    addConversationNode,
    updateNodeName,
    updateNodeText,
    getNode,
    getNodeByKeywords,
    addPrompt,
    removePrompt,
    updatePrompt,
    addKeyWord,
    removeKeyWord,
    addTarget,
    removeTarget,
    updateNodePosition,
};
