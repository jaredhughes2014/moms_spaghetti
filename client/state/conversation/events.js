
import util from '../stateTools';

/**
 * Event executed to set the active conversations
 */
const setConversations = util.formatEvent(
    'SET_CONVERSATIONS',
    (conversations) => util.createEvent(setConversations, {conversations})
);

/**
 * Adds a new conversation to the list of active conversation
 */
const addConversation = util.formatEvent(
    'ADD_CONVERSATION',
    (conversation) => util.createEvent(addConversation, conversation)
);

/**
 * Set the conversation to edit
 */
const editConversation = util.formatEvent(
    'EDIT_CONVERSATION',
    (conversation) => util.createEvent(editConversation, conversation)
);

export default {
    setConversations,
    addConversation,
    editConversation,
};