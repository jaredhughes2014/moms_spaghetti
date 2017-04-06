
import util from '../stateTools';
import events from './events';

const defaultState = {
    conversations: [],
    active: null,
};

/**
 * Changes the conversation state based on the event dispatched
 */
const reducer = (state=defaultState, event) =>
{
    switch (util.getEventId(event)) {

        case (events.setConversations.type):
            return Object.assign({}, state, {conversations: event.conversations});

        case (events.addConversation.type):
            let conversations = state.conversations;
            conversations.push(event.name);
            return Object.assign({}, state, {conversations});

        case (events.editConversation.type):
            console.log(event);
            return Object.assign({}, state, {active: event.conversation});

        default: return state;
    }
};

export default reducer;