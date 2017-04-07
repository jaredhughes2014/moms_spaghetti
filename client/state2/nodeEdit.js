
const defaultState = {
    name: "",
    keyWords: [],
    prompts: [],
    text: "",
    targets: []
};

/**
 * Sets the name of the current conversation. This is an asynchronous action
 */
const setName = {
    type: 'SET_CONVERSATION_NODE_NAME',
    expectedArgs: ['name'],
};

/**
 * Sets the text associated with this node
 */
const setText = {
    type: 'SET_CONVERSATION_NODE_TEXT',
    expectedArgs: ['text']
};

/**
 * Loads a conversation node from the server. This is an asynchronous action
 */
const loadNode = {
    type: 'LOAD_CONVERSATION_NODE',
    expectedArgs: ['conversationName', 'nodeName'],
};

/**
 * Sets the active conversation node being edited.
 */
const setNode = {
    type: 'SET_ACTIVE_CONVERSATION_NODE',
    expectedArgs: ['name', 'nodes', 'triggers', 'variables'],
};

/**
 * Adds a variable prompt to the edited node. This is an asynchronous action
 */
const addPrompt = {
    type: 'ADD_NODE_PROMPT',
    expectedArgs: ['conversationName', 'nodeName', 'promptName'],
};

/**
 * Removes a variable prompt from the edited node. This is an asynchronous action
 */
const removePrompt = {
    type: 'REMOVE_NODE_PROMPT',
    expectedArgs: ['conversationName', 'nodeName', 'promptName'],
};

/**
 * Updates a prompt within a conversation node. This is an asynchronous action
 */
const updatePrompt = {
    type: 'UPDATE_NODE_PROMPT',
    expectedArgs: ['conversationName', 'nodeName', 'promptName', 'variableSet', 'text']
};

/**
 * Sets the list of available variable prompts for this conversation
 */
const setPrompts = {
    type: 'SET_AVAILABLE_NODE_PROMPTS',
    expectedArgs: ['prompts'],
};

/**
 * Adds a keyword to the edited node. This is an asynchronous action
 */
const addKeyword = {
    type: 'ADD_NODE_KEYWORD',
    expectedArgs: ['word'],
};

/**
 * Removes a keyword from the edited node. This is an asynchronous action
 */
const removeKeyword = {
    type: 'REMOVE_NODE_KEYWORD',
    expectedArgs: ['word'],
};

/**
 * Sets the list of available keywords for this node
 */
const setKeywords = {
    type: 'SET_AVAILABLE_NODE_KEYWORDS',
    expectedArgs: ['keyWords'],
};

/**
 * Adds a target node to the edited node. This is an asynchronous action
 */
const addTarget = {
    type: 'ADD_TARGET_NODE',
    expectedArgs: ['name'],
};

/**
 * Removes a target node from the edited node. This is an asynchronous action
 */
const removeTarget = {
    type: 'REMOVE_TARGET_NODE',
    expectedArgs: ['name'],
};

/**
 * Sets the list of target nodes for this node
 */
const setTargets = {
    type: 'SET_AVAILABLE_TARGET_NODES',
    expectedArgs: ['targets'],
};

/**
 * The reducer function for the conversations state
 */
const reducer = (state=defaultState, event) =>
{
    let args = event.args;
    switch (event.type) {

        case (setNode.type):
            return Object.assign({}, state, {
                name: args.name,
                text: args.text,
                keyWords: args.keyWords,
                prompts: args.prompts,
                targets: args.targets,
            });

        case (setPrompts.type):
            return Object.assign({}, state, {prompts: args.prompts});

        case (setKeywords.type):
            return Object.assign({}, state, {keyWords: args.keyWords});

        case (setTargets.type):
            return Object.assign({}, state, {targets: args.targets});

        default: return state;
    }
};

/**
 * Used to combine all state definitions into a single export
 */
const api = {
    events: {
        setName,
        setText,
        loadNode,
        setNode,
        addPrompt,
        removePrompt,
        updatePrompt,
        setPrompts,
        addKeyword,
        removeKeyword,
        setKeywords,
        addTarget,
        removeTarget,
        setTargets,
    },
    reducer
};
export default api;