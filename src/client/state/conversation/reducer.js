
import util from '../stateTools';
import events from './events';

import Conversation from '../../../data/Conversation';

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
            let conversations = event.conversations.map(p => new Conversation(p.name, p.triggers, p.nodes, p.variables));
            return Object.assign({}, state, {conversations});

        case (events.addConversation.type):
            conversations = state.conversations.map(p => p);
            let newConversation = new Conversation('');
            conversations.push(Object.assign(newConversation, event.conversation));

            return Object.assign({}, state, {conversations});

        case (events.setActiveConversation.type):
            active = event.name ? state.conversations.find(p => p.name === event.name) : null;
            return Object.assign({}, state, {active});

        case (events.addNode.type):
            let active = state.active;
            active.addNode([], '');

            console.log(active);
            return Object.assign({}, state, {active});

        case (events.addTrigger.type):
            active = state.active;
            active.addTrigger(event.text);
            return Object.assign({}, state, {active});

        case (events.addVariable.type):
            active = state.active;
            active.addVariable(event.name);
            return Object.assign({}, state, {active});


        default: return state;
    }
};

export default reducer;