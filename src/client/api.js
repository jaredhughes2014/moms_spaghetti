
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
const handleError = (err) =>
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
const addConversation = (name, onAdded) =>
{
    sendRequest(methods.post, paths.conversations.add, onAdded, {name});
};

/**
 * Saves a conversation. This conversation must already exist in the database
 */
const saveConversation = (conversation, onSaved) =>
{
    sendRequest(methods.post, paths.conversations.save, onSaved, {conversation})
};

export default {
    getConversations,
    addConversation,
    saveConversation,
};