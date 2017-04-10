
import conversationEdit from './state/conversationEdit';
import conversations from './state/conversations';
import nodeEdit from './state/nodeEdit';

/**
 * Converts an event type string into a function which accepts an event argument
 * @param event
 * @returns {function(*)}
 */
const transformEventDefinition = (event) =>
{
    return (args) => {
        if (event.expectedArgs) {
            let missing = event.expectedArgs.filter(p => args[p] == undefined);

            if (missing.length > 0) {

                let message = `Missing expected arguments from ${event.type}: `;
                for (let i = 0; i < missing.length - 1; ++i) {
                    message += missing[i] + ', ';
                }

                message += missing[missing.length - 1];
                console.warn(message);
            }
        }
        return Object.assign({}, {type: event.type}, {args});
    }
};

/**
 * Converts each event from a data object into an executable function. This executable
 * function will manage formatting of the created event into a usable state
 * @param events
 * @returns {{}}
 */
const formatEventObject = (events) =>
{
    let formatted = {};

    let keys = Object.keys(events);
    for (let i = 0; i < keys.length; ++i) {
        formatted[keys[i]] = transformEventDefinition(events[keys[i]]);
    }

    return formatted;
};

const api = {
    conversations: formatEventObject(conversations.events),
    conversationEdit: formatEventObject(conversationEdit.events),
    nodeEdit: formatEventObject(nodeEdit.events),
};
export default api;