
import {put, call} from 'redux-saga/effects';
import {takeEvery, takeLatest} from 'redux-saga';
import api from '../api';

const defaultState = {
    name: "",
    nodes: [],
    triggers: [],
    variables: [],
    loading: true,
};

/**
 * Sets the name of the current conversation. This is an asynchronous action
 */
const setName = {
    type: 'SET_CONVERSATION_NAME',
    expectedArgs: ['oldName', 'newName'],
};

/**
 * Puts the conversation edit state in the waiting state
 */
const setWaiting = {
    type: 'SET_CONVERSATION_EDIT_WAITING',
    expectedArgs: [],
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
    expectedArgs: ['conversationName', 'triggerName'],
};

/**
 * Removes a trigger from the edited conversation. This is an asynchronous action
 */
const removeTrigger = {
    type: 'REMOVE_CONVERSATION_TRIGGER',
    expectedArgs: ['conversationName', 'triggerName'],
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
 * Updates the x, y coordinates of a conversation node
 */
const updateNodePosition = {
    type: 'UPDATE_NODE_POSITION',
    expectedArgs: ['conversationName', 'nodeName', 'x', 'y']
};

/**
 * Adds a target node to the edited node. This is an asynchronous action
 */
const addNodeTarget = {
    type: 'ADD_TARGET_NODE',
    expectedArgs: ['conversationName', 'nodeName', 'targetName'],
};

/**
 * Removes a target node from the edited node. This is an asynchronous action
 */
const removeNodeTarget = {
    type: 'REMOVE_TARGET_NODE',
    expectedArgs: ['conversationName', 'nodeName', 'targetName'],
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
                name: args.conversation.name,
                nodes: args.conversation.nodes,
                triggers: args.conversation.triggers,
                variables: args.conversation.variables,
                loading: false,
            });

        case(setNodes.type):
            return Object.assign({}, state, {nodes: args.nodes, loading: false});

        case(setVariables.type):
            return Object.assign({}, state, {variables: args.variables, loading: false});

        case(setTriggers.type):
            return Object.assign({}, state, {triggers: args.triggers, loading: false});

        case (setWaiting.type):
            return Object.assign({}, state, {loading: true});

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
        yield put({type: setWaiting.type, args: {}});
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
        yield put({type: setWaiting.type, args: {}});
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
        yield put({type: setWaiting.type, args: {}});
        const {nodes} = yield call(api.addConversationNode, conversationName, nodeName);
        yield put({type: setNodes.type, args: {nodes}})
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
        yield put({type: setWaiting.type, args: {}});
        const {nodes} = yield call(api.removeConversationNode, conversationName, nodeName);
        yield put({type: setNodes.type, args: {nodes}})
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
    const {conversationName, triggerName} = event.args;

    try {
        yield put({type: setWaiting.type, args: {}});
        const {triggers} = yield call(api.addConversationTrigger, conversationName, triggerName);
        yield put({type: setTriggers.type, args: {triggers}})
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
    const {conversationName, triggerName} = event.args;

    try {
        yield put({type: setWaiting.type, args: {}});
        const {triggers} = yield call(api.removeConversationTrigger, conversationName, triggerName);
        yield put({type: setTriggers.type, args: {triggers}})
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
        yield put({type: setWaiting.type, args: {}});
        const {variables} = yield call(api.addConversationVariable, conversationName, variableName);
        yield put({type: setVariables.type, args: {variables}});
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
        yield put({type: setWaiting.type, args: {}});
        const {variables} = yield call(api.removeConversationVariable, conversationName, variableName);
        yield put({type: setVariables.type, args: {variables}})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Updates the x, y coordinates of a conversation node
 * @param event
 */
function* updateNodePositionHandler(event)
{
    const {conversationName, nodeName, x, y} = event.args;

    try {
        const {nodes} = yield call(api.updateNodePosition, conversationName, nodeName, x, y);
        yield put({type: setNodes.type, args: {nodes}});
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Adds a target to the edited node
 */
function* addTargetHandler(event)
{
    const {conversationName, nodeName, targetName} = event.args;

    try {
        yield put({type: setWaiting.type, args: {}});
        const {nodes} = yield call(api.addNodeTarget, conversationName, nodeName, targetName);
        yield put({type: setNodes.type, args: {nodes}})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Removes a target from the edited node
 */
function* removeTargetHandler(event)
{
    const {conversationName, nodeName, targetName} = event.args;

    try {
        yield put({type: setWaiting.type, args: {}});
        const {nodes} = yield call(api.removeNodeTarget, conversationName, nodeName, targetName);
        yield put({type: setNodes.type, args: {nodes}})
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

    yield takeEvery(updateNodePosition.type, updateNodePositionHandler);
    yield takeEvery(addNodeTarget.type, addTargetHandler);
    yield takeEvery(removeNodeTarget.type, removeTargetHandler);
}


/**
 * Used to combine all state definitions into a single export
 */
const exports = {
    events: {
        setName,
        loadConversation,
        setWaiting,
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
        updateNodePosition,
        addNodeTarget,
        removeNodeTarget,
    },
    reducer,
    saga,
};
export default exports;