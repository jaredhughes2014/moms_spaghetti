
import paths from '../app/paths';

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
 * Builds a handler that processes messages from the application
 */
const buildHandler = (response, onSuccess) =>
{
    if (response.warning) {
        console.warn(response.warning);
    }
    else if (response.warning) {
        console.error(response.error);
    }
    else {
        onSuccess(response);
    }
};

/**
 * Builds an AJAX request and sends it. The handler function will receive
 * the server response
 */
const sendRequest = (method, path, handler, data=null) =>
{
    $.ajax({
        success: (response) => buildHandler(response, handler),
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
    sendRequest(methods.get, paths.conversationRoot, onLoaded);
};

/**
 * Adds a new conversation to the database
 */
const addConversation = (name, onLoaded) =>
{
    sendRequest(methods.post, paths.conversations.add, onLoaded, {name});
};

const fetchConversation = (name, onLoaded) =>
{
    console.log(name);
    sendRequest(methods.post, paths.conversations.get, onLoaded, {name});
};

/**
 * Saves the given conversation in the "database"
 */
const saveConversation = (conversation, onSaved) =>
{
    sendRequest(methods.post, paths.conversations.save, onSaved, {conversation});
};

export default {
    getConversations,
    addConversation,
    saveConversation,
    fetchConversation,
};