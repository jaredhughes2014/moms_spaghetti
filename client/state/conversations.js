
import {put, call} from 'redux-saga/effects';
import {takeEvery, takeLatest} from 'redux-saga';
import api from '../api';

const defaultState = {
    available: [],
    loading: false,
};

/**
 * Event executed to set all conversations in the state.
 */
const setConversations = {
    type: 'SET_CONVERSATIONS',
    expectedArgs: ['conversations'],
};

/**
 * Event executed to add a conversation to the list of available conversations. This is an asynchronous
 * action
 */
const addConversation = {
    type: 'ADD_CONVERSATION',
    expectedArgs: ['name'],
};

/**
 * Event executed to remove a conversation from the list of available conversations. This is an asynchronous
 * action
 */
const removeConversation = {
    type: 'DELETE_CONVERSATION',
    expectedArgs: ['name'],
};

/**
 * Event executed to fetch all conversations from the server. This is an asynchronous action
 */
const fetchConversations = {
    type: 'FETCH_CONVERSATIONS',
    expectedArgs: [],
};

/**
 * Event executed to notify that a response is being awaited from the server
 */
const waitForConversations = {
    type: 'WAIT_FOR_CONVERSATIONS',
    expectedArgs: [],
};


/**
 * The reducer function for the conversations state
 */
const reducer = (state=defaultState, event) =>
{
    let args = event.args;
    console.log(event);

    switch (event.type) {

        case (setConversations.type):
            return Object.assign({}, state, {available: args.conversations, loading: false});

        case (waitForConversations.type):
            return Object.assign({}, state, {loading: true});

        default: return state;
    }
};

/**
 * Asynchronous event for adding a conversation
 */
function* addConversationHandler(event)
{
    const {name} = event.args;

    try {
        if (name) {
            yield put(wait());
            const {conversations} = yield call(api.addConversation, name);
            yield put({type: setConversations.type, args: {conversations}});
        }
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Asynchronous event for removing a conversation
 */
function* removeConversationHandler(event)
{
    const {name} = event.args;

    try {
        if (name) {
            yield put(wait());
            const {conversations} = yield call(api.removeConversation, name);
            yield put({type: setConversations.type, args: {conversations}});
        }
    }
    catch (err) {
        console.error(err);
    }
}

/**
 * Asynchronous event for fetching all conversations
 */
function* fetchConversationsHandler()
{
    try {
        yield put(wait());
        const {conversations} = yield call(api.fetchConversations);
        yield put({type: setConversations.type, args: {conversations}});
    }
    catch(err) {
        console.error(err);
    }
}

/**
 * Returns a wait event object that puts the conversations state in a waiting state
 */
const wait = () =>
{
    return {type: waitForConversations.type, args: {}};
};

/**
 * Assigns each asynchronous event to its handler function.
 */
function* saga()
{
    yield takeEvery(addConversation.type, addConversationHandler);
    yield takeEvery(removeConversation.type, removeConversationHandler);
    yield takeLatest(fetchConversations.type, fetchConversationsHandler);
}

/**
 * Used to combine all state definitions into a single export
 */
const exports = {
    events: {
        setConversations,
        addConversation,
        removeConversation,
        fetchConversations,
        waitForConversations,
    },
    reducer,
    saga,
};
export default exports;