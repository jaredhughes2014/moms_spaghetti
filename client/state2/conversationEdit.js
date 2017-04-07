
const defaultState = {
    name: "",
    nodes: [],
    triggers: [],
    variables: [],
};

/**
 * Sets the name of the current conversation. This is an asynchronous action
 */
const setName = {
    type: 'SET_CONVERSATION_NAME',
    expectedArgs: ['name'],
};

/**
 * Loads a conversation from the server. This is an asynchronous action
 */
const loadConversation = {
    type: 'LOAD_CONVERSATION',
    expectedArgs: ['name'],
};

/**
 * Sets the active conversation being edited.
 */
const setConversation = {
    type: 'SET_ACTIVE_CONVERSATION',
    expectedArgs: ['name', 'nodes', 'triggers', 'variables'],
};

/**
 * Adds a node to the edited conversation. This is an asynchronous action
 */
const addNode = {
    type: 'ADD_CONVERSATION_NODE',
    expectedArgs: ['name'],
};

/**
 * Removes a node from the edited conversation. This is an asynchronous action
 */
const removeNode = {
    type: 'REMOVE_CONVERSATION_NODE',
    expectedArgs: ['name'],
};

/**
 * Sets the list of available nodes for this conversation
 */
const setNodes = {
    type: 'SET_AVAILABLE_NODES',
    expectedArgs: ['nodes'],
};

/**
 * Adds a trigger to the edited conversation. This is an asynchronous action
 */
const addTrigger = {
    type: 'ADD_CONVERSATION_TRIGGER',
    expectedArgs: ['word'],
};

/**
 * Removes a trigger from the edited conversation. This is an asynchronous action
 */
const removeTrigger = {
    type: 'REMOVE_CONVERSATION_TRIGGER',
    expectedArgs: ['word'],
};

/**
 * Sets the list of available triggers for this conversation
 */
const setTriggers = {
    type: 'SET_AVAILABLE_TRIGGERS',
    expectedArgs: ['triggers'],
};

/**
 * Adds a variable to the edited conversation. This is an asynchronous action
 */
const addVariable = {
    type: 'ADD_CONVERSATION_VARIABLE',
    expectedArgs: ['name'],
};

/**
 * Removes a variable from the edited conversation. This is an asynchronous action
 */
const removeVariable = {
    type: 'REMOVE_CONVERSATION_VARIABLE',
    expectedArgs: ['name'],
};

/**
 * Sets the list of available variables for this conversation
 */
const setVariables = {
    type: 'SET_AVAILABLE_VARIABLES',
    expectedArgs: ['variables'],
};



/**
 * The reducer function for the conversations state
 */
const reducer = (state=defaultState, event) =>
{
    let args = event.args;
    switch (event.type) {

        case(setConversation.type):
            return Object.assign({}, state, {
                name: args.name,
                nodes: args.nodes,
                triggers: args.triggers,
                variables: args.variables,
            });

        case(setNodes.type):
            return Object.assign({}, state, {nodes: args.nodes});

        case(setVariables.type):
            return Object.assign({}, state, {variables: args.variables});

        case(setTriggers.type):
            return Object.assign({}, state, {triggers: args.triggers});

        default: return state;
    }
};

/**
 * Used to combine all state definitions into a single export
 */
const api = {
    events: {
        setName,
        loadConversation,
        setConversation,
        addNode,
        removeNode,
        setNodes,
        addTrigger,
        removeTrigger,
        setTriggers,
        addVariable,
        removeVariable,
        setVariables,
    },
    reducer
};
export default api;