
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
const handleError = (handler) =>
{
    console.error("TODO error handling");
};

/**
 * Builds an AJAX request and sends it. The handler function will receive
 * the server response
 */
const sendRequest = (method, path, handler, data=null) =>
{
    $.ajax({
        success: handler,
        data: data,
        method: method,
        url: path,
        error: handleError
    });
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
    sendRequest(methods.post, paths.conversations.add, onLoaded, {name: name});
};

export default {
    getConversations,
    addConversation,
};