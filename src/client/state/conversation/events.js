
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

/**
 * Add a new node to the current conversation
 */
const addNode = util.formatEvent(
    'ADD_NODE',
    () => util.createEvent(addNode, {})
);

/**
 * Add a new variable to the current conversation
 */
const addVariable = util.formatEvent(
    'ADD_VARIABLE',
    (name) => util.createEvent(addVariable, {name})
);

/**
 * Add a new trigger to the current conversation
 */
const addTrigger = util.formatEvent(
    'ADD_TRIGGER',
    (text) => util.createEvent(addTrigger, {text})
);

export default {
    setConversations,
    addConversation,
    setActiveConversation,
    addNode,
    addVariable,
    addTrigger,
};