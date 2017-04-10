
import {put, call} from 'redux-saga/effects';
import {takeEvery, takeLatest} from 'redux-saga';
import api from '../api';

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
    expectedArgs: ['oldName', 'newName'],
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
    expectedArgs: ['conversationName', 'nodeName'],
};

/**
 * Removes a node from the edited conversation. This is an asynchronous action
 */
const removeNode = {
    type: 'REMOVE_CONVERSATION_NODE',
    expectedArgs: ['conversationName', 'nodeName'],
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
    expectedArgs: ['conversationName', 'word'],
};

/**
 * Removes a trigger from the edited conversation. This is an asynchronous action
 */
const removeTrigger = {
    type: 'REMOVE_CONVERSATION_TRIGGER',
    expectedArgs: ['conversationName', 'word'],
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
    expectedArgs: ['conversationName', 'variableName'],
};

/**
 * Removes a variable from the edited conversation. This is an asynchronous action
 */
const removeVariable = {
    type: 'REMOVE_CONVERSATION_VARIABLE',
    expectedArgs: ['conversationName', 'variableName'],
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
 * Sets the name of the edited conversation
 */
function* setNameHandler(event)
{
    const {oldName, newName} = event.args;

    try {
        const response = yield call(api.updateConversationName, oldName, newName);
        yield put({type: setConversation.type, args: response})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Loads the conversation with the given name
 */
function* loadConversationHandler(event)
{
    const {name} = event.args;

    try {
        const response = yield call(api.getConversation, name);
        yield put({type: setConversation.type, args: response})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Adds a node to the edited conversation
 */
function* addNodeHandler(event)
{
    const {conversationName, nodeName} = event.args;

    try {
        const response = yield call(api.addConversationNode, conversationName, nodeName);
        yield put({type: setConversation.type, args: response})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Removes a conversation node from the edited conversation
 */
function* removeNodeHandler(event)
{
    const {conversationName, nodeName} = event.args;

    try {
        const response = yield call(api.removeConversationNode, conversationName, nodeName);
        yield put({type: setConversation.type, args: response})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Adds a trigger word to the edited conversation
 */
function* addTriggerHandler(event)
{
    const {conversationName, word} = event.args;

    try {
        const response = yield call(api.addConversationTrigger, conversationName, word);
        yield put({type: setConversation.type, args: response})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Removes a trigger word from the edited conversation
 */
function* removeTriggerHandler(event)
{
    const {conversationName, word} = event.args;

    try {
        const response = yield call(api.removeConversationTrigger, conversationName, word);
        yield put({type: setConversation.type, args: response})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Adds a variable to the edited conversation
 */
function* addVariableHandler(event)
{
    const {conversationName, variableName} = event.args;

    try {
        const response = yield call(api.addConversationVariable, conversationName, variableName);
        yield put({type: setConversation.type, args: response});
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Removes a variable from the conversation
 */
function* removeVariableHandler(event)
{
    const {conversationName, variableName} = event.args;

    try {
        const response = yield call(api.removeConversationVariable, conversationName, variableName);
        yield put({type: setConversation.type, args: response})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Maps every saga handler function to its event
 */
function* saga()
{
    yield takeEvery(setName.type, setNameHandler);
    yield takeEvery(loadConversation.type, loadConversationHandler);

    yield takeEvery(addNode.type, addNodeHandler);
    yield takeEvery(removeNode.type, removeNodeHandler);

    yield takeEvery(addTrigger.type, addTriggerHandler);
    yield takeEvery(removeTrigger.type, removeTriggerHandler);

    yield takeEvery(addVariable.type, addVariableHandler);
    yield takeEvery(removeVariable.type, removeVariableHandler);
}


/**
 * Used to combine all state definitions into a single export
 */
const exports = {
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
    reducer,
    saga,
};
export default exports;