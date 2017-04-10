
import paths from '../app/paths';

/**
 * Sets of executable HTTP methods
 */
const http = {
    get: 'GET',
    post: 'POST',
};

/**
 * Performs a fetch from the database
 */
const formatFetch = (path, method, data = null) =>
{
    let body = data == null ? undefined : data;
    return fetch(
        path,
        {
            method,
            headers: {'Content-Type': 'application/json'},
            body: body ? JSON.stringify(body) : undefined,
        }
    )
        .then(response => response.json())
        .then(json => {
            if (json.error) {
                console.error(json.error);
            }
            else if (json.warning) {
                console.warn(json.warning);
            }
            return json;
        });
};


const api = {

    // Conversations
    addConversation: (name) => formatFetch(paths.conversations.add, http.post, {
        name,
    }),
    removeConversation: (name) => formatFetch(paths.conversations.remove, http.post, {
        name,
    }),
    fetchConversations: () => formatFetch(paths.conversations.all, http.get),
    getConversation: (name) => formatFetch(paths.conversations.get, http.post, {
        name,
    }),

    // Conversation Editing

    updateConversationName: (oldName, newName) => formatFetch(paths.conversation.updateName, http.post, {
        oldName,
        newName,
    }),
    addConversationNode: (conversationName, nodeName) => formatFetch(paths.conversation.addNode, http.post, {
        conversationName,
        nodeName,
    }),
    removeConversationNode: (conversationName, nodeName) => formatFetch(paths.conversation.removeNode, http.post, {
        conversationName,
        nodeName,
    }),

    addConversationTrigger: (conversationName, word) => formatFetch(paths.conversation.addTrigger, http.post, {
        conversationName,
        word,
    }),
    removeConversationTrigger: (conversationName, word) => formatFetch(paths.conversation.removeTrigger, http.post, {
        conversationName,
        word,
    }),

    addConversationVariable: (conversationName, variableName) => formatFetch(paths.conversation.addVariable, http.post, {
        conversationName,
        variableName,
    }),
    removeConversationVariable: (conversationName, variableName) => formatFetch(paths.conversation.removeVariable, http.post, {
        conversationName,
        variableName,
    }),

    //Nodes

    updateNodeName: (conversationName, nodeName, newName) => formatFetch(paths.node.updateName, http.post, {
        conversationName,
        nodeName,
        newName,
    }),
    updateNodeText: (conversationName, nodeName, text) => formatFetch(paths.node.updateText, http.post, {
        conversationName,
        nodeName,
        text,
    }),
    getNode: (conversationName, nodeName) => formatFetch(paths.node.get, http.post, {
        conversationName,
        nodeName,
    }),

    addNodePrompt: (conversationName, nodeName, promptName) => formatFetch(paths.node.addPrompt, http.post, {
        conversationName,
        nodeName,
        promptName
    }),
    removeNodePrompt: (conversationName, nodeName, promptName) => formatFetch(paths.node.removePrompt, http.post, {
        conversationName,
        nodeName,
        promptName,
    }),
    updateNodePrompt: (conversationName, nodeName, promptName, promptText, variableSet) => formatFetch(paths.node.updatePrompt, http.post, {
        conversationName,
        nodeName,
        promptName,
        promptText,
        variableSet,
    }),

    addNodeKeyWord: (conversationName, nodeName, keyWord) => formatFetch(paths.node.addKeyWord, http.post, {
        conversationName,
        nodeName,
        keyWord,
    }),
    removeNodeKeyWord: (conversationName, nodeName, keyWord) => formatFetch(paths.node.removeKeyWord, http.post, {
        conversationName,
        nodeName,
        keyWord,
    }),

    addNodeTarget: (conversationName, nodeName, targetName) => formatFetch(paths.node.addTarget, http.post, {
        conversationName,
        nodeName,
        targetName,
    }),
    removeNodeTarget: (conversationName, nodeName, targetName) => formatFetch(paths.node.removeTarget, http.post, {
        conversationName,
        nodeName,
        targetName,
    }),
};
export default api;