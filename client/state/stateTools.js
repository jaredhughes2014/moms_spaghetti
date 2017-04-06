/**
 * Copies all event arguments into a single event object
 */
const createEvent = (event, args) =>
{
    return Object.assign({}, {type: event.type}, {args});
};

/**
 * Formats an event in the expected fashion
 */
const formatEvent = (type, creator) =>
{
    return {
        type: type,
        create: creator
    }
};

/**
 * Gets the type string that identifies the given event object
 */
const getEventId = (event) =>
{
    return event.type;
};

export default {
    createEvent,
    formatEvent,
    getEventId,
};
