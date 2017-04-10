
import {put, call} from 'redux-saga/effects';
import {takeEvery, takeLatest} from 'redux-saga';
import api from '../api2';

const defaultState = {
    name: "",
    keyWords: [],
    prompts: [],
    text: "",
    targets: []
};

/**
 * Sets the name of the current conversation node. This is an asynchronous action
 */
const setName = {
    type: 'SET_CONVERSATION_NODE_NAME',
    expectedArgs: ['conversationName', 'oldName', 'newName'],
};

/**
 * Sets the text associated with this node
 */
const setText = {
    type: 'SET_CONVERSATION_NODE_TEXT',
    expectedArgs: ['conversationName', 'nodeName', 'text']
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
    expectedArgs: ['conversationName', 'nodeName', 'promptName', 'variableSet', 'promptText']
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
const addKeyWord = {
    type: 'ADD_NODE_KEYWORD',
    expectedArgs: ['conversationName', 'nodeName', 'keyWord'],
};

/**
 * Removes a keyword from the edited node. This is an asynchronous action
 */
const removeKeyWord = {
    type: 'REMOVE_NODE_KEYWORD',
    expectedArgs: ['conversationName', 'nodeName', 'keyWord'],
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
    expectedArgs: ['conversationName', 'nodeName', 'targetName'],
};

/**
 * Removes a target node from the edited node. This is an asynchronous action
 */
const removeTarget = {
    type: 'REMOVE_TARGET_NODE',
    expectedArgs: ['conversationName', 'nodeName', 'targetName'],
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
 * Sets the name of the node being edited
 */
function* setNameHandler(event)
{
    const {conversationName, oldName, newName} = event.args;

    try {
        const response = yield call(api.updateNodeName, conversationName, oldName, newName);
        yield put({type: setNode.type, args: response})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Sets the text of the node being edited
 */
function* setTextHandler(event)
{
    const {conversationName, nodeName, text} = event.args;

    try {
        const response = yield call(api.updateNodeText, conversationName, nodeName, text);
        yield put({type: setNode.type, args: response})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Fetches a particular node from a conversation
 */
function* loadNodeHandler(event)
{
    const {conversationName, nodeName} = event.args;

    try {
        const response = yield call(api.getNode, conversationName, nodeName);
        yield put({type: setNode.type, args: response})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Adds a prompt to the edited node
 */
function* addPromptHandler(event)
{
    const {conversationName, nodeName, promptName} = event.args;

    try {
        const {prompts} = yield call(api.addNodePrompt, conversationName, nodeName, promptName);
        yield put({type: setPrompts.type, args: {prompts}})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Removes a prompt from the edited node
 */
function* removePromptHandler(event)
{
    const {conversationName, nodeName, promptName} = event.args;

    try {
        const {prompts} = yield call(api.removeNodePrompt, conversationName, nodeName, promptName);
        yield put({type: setPrompts.type, args: {prompts}})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Updates the contents of a prompt within the edited node
 */
function* updatePromptHandler(event)
{
    const {conversationName, nodeName, promptName, promptText, variableSet} = event.args;

    try {
        const {prompts} = yield call(api.updateNodePrompt, conversationName, nodeName, promptName, promptText, variableSet);
        yield put({type: setPrompts.type, args: {prompts}})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Adds a key word to the edited node
 */
function* addKeyWordHandler(event)
{
    const {conversationName, nodeName, keyWord} = event.args;

    try {
        const {keyWords} = yield call(api.addNodeKeyWord, conversationName, nodeName, keyWord);
        yield put({type: setKeywords.type, args: {keyWords}})
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Removes a key word to the edited node
 */
function* removeKeyWordHandler(event)
{
    const {conversationName, nodeName, keyWord} = event.args;

    try {
        const {keyWords} = yield call(api.removeNodeKeyWord, conversationName, nodeName, keyWord);
        yield put({type: setKeywords.type, args: {keyWords}})
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
        const {targets} = yield call(api.addNodeTarget, conversationName, nodeName, targetName);
        yield put({type: setTargets.type, args: {targets}})
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
        const {targets} = yield call(api.removeNodeTarget, conversationName, nodeName, targetName);
        yield put({type: setTargets.type, args: {targets}})
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
    yield takeEvery(setText.type, setTextHandler);
    yield takeEvery(loadNode.type, loadNodeHandler);

    yield takeEvery(addPrompt.type, addPromptHandler);
    yield takeEvery(removePrompt.type, removePromptHandler);
    yield takeEvery(updatePrompt.type, updatePromptHandler);

    yield takeEvery(addKeyWord.type, addKeyWordHandler);
    yield takeEvery(removeKeyWord.type, removeKeyWordHandler);

    yield takeEvery(addTarget.type, addTargetHandler);
    yield takeEvery(removeTarget.type, removeTargetHandler);
}

/**
 * Used to combine all state definitions into a single export
 */
const exports = {
    events: {
        setName,
        setText,
        loadNode,
        setNode,
        addPrompt,
        removePrompt,
        updatePrompt,
        setPrompts,
        addKeyWord,
        removeKeyWord,
        setKeywords,
        addTarget,
        removeTarget,
        setTargets,
    },
    reducer,
    saga
};
export default exports;