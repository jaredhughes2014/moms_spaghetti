
import util from '../stateTools';
import events from './events';

const defaultState = {
    conversations: []
};

/**
 * Changes the conversation state based on the event dispatched
 */
const reducer = (state=defaultState, event) =>
{
    switch (util.getEventId(event)) {

        case (events.setConversations.type):
            return Object.assign({}, state, {conversations: event.conversations});

        default: return state;
    }
};

export default reducer;