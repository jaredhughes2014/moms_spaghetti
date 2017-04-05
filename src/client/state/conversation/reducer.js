
import util from '../stateTools';
import events from './events';

const defaultState = {
    conversations: [],
    active: null
};

/**
 * Changes the conversation state based on the event dispatched
 */
const reducer = (state=defaultState, event) =>
{
    switch (util.getEventId(event)) {

        case (events.setConversations.type):
            let conversations = event.conversations.map(p => p);
            return Object.assign({}, state, {conversations});

        case (events.addConversation.type):
            conversations = state.conversations.map(p => p);
            conversations.push(event.conversation);
            return Object.assign({}, state, {conversations});

        case (events.setActiveConversation.type):
            if (event.name) {
                return Object.assign({}, state, {active: state.conversations.find(p => p.name === event.name)});
            }
            else {
                return Object.assign({}, state, {active: null});
            }

        default: return state;
    }
};

export default reducer;