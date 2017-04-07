
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
const deleteConversation = {
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
    switch (event.type) {

        case (setConversations.type):
            return Object.assign({}, state, {available: args.conversations, loading: false});

        case (waitForConversations.type):
            return Object.assign({}, state, {loading: true});

        default: return state;
    }
};

/**
 * Used to combine all state definitions into a single export
 */
const api = {
    events: {
        setConversations,
        addConversation,
        deleteConversation,
        fetchConversations,
        waitForConversations,
    },
    reducer
};
export default api;