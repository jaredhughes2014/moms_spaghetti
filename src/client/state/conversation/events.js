
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

/**
 * Sets the active conversation. Execute with null to deselect the active
 * conversation
 */
const setActiveConversation = util.formatEvent(
    'SET_ACTIVE_CONVERSATION',
    (name) => util.createEvent(setActiveConversation, {name})
);

export default {
    setConversations,
    addConversation,
    setActiveConversation,
};