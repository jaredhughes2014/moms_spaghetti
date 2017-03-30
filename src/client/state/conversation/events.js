
import util from '../stateTools';

/**
 * Event executed to set the active conversations
 */
const setConversations = util.formatEvent(
    'SET_CONVERSATIONS',
    (conversations) => util.createEvent(setConversations, {conversations})
);

/**
 * Event executed to add a new conversation
 */
const addConversation = util.formatEvent(
    'ADD_CONVERSATION',
    (conversation) => util.createEvent(addConversation, {conversation})
);

export default {
    setConversations,
    addConversation,
};