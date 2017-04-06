
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
    let args = event.args;
    switch (util.getEventId(event)) {

        case (events.setConversations.type):
            return Object.assign({}, state, {conversations: args.conversations});

        case (events.addConversation.type):
            let conversations = state.conversations;
            conversations.push(args.name);
            return Object.assign({}, state, {conversations});

        case (events.editConversation.type):
            console.log(event);
            return Object.assign({}, state, {active: args});

        default: return state;
    }
};

export default reducer;