
import paths from '../paths';

/**
 * HTTP methods. Referenced here for consistency
 */
const methods = {
    get: 'GET',
    post: 'POST',
    delete: 'DELETE'
};

/**
 * Builds a handler that will process the server response when it is completed
 */
const buildResponseHandler = (handler) =>
{
    return (request) => {
        if (request.readyState == XMLHttpRequest.DONE) {
            switch (request.status) {
                case(200):
                    handler(JSON.parse(request.responseText));
                    break;

                default:
                    console.error('Unhandled response code: ' + request.status);
                    break;
            }
        }
        else {
            // Not sure what to do here
        }
    };
};

/**
 * Builds an AJAX request and sends it. The handler function will receive
 * the server response
 */
const sendRequest = (method, path, handler, data=null) =>
{
    let req = new XMLHttpRequest();

    req.onreadystatechange = buildResponseHandler(handler);
    req.open(method, path, true);
    req.send(data);
};


/**
 * Loads all conversations from the server
 * @param onLoaded
 */
const getConversations = (onLoaded) =>
{
    sendRequest(methods.get, paths.conversations.get, onLoaded);
};

/**
 * Adds a new conversation to the database
 */
const addConversation = (name, onLoaded) =>
{
    sendRequest(methods.post, paths.conversations.add, onLoaded, {name});
};

export default {
    getConversations,
    addConversation,
};