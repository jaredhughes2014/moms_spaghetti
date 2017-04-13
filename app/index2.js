const paths = require("./paths");
const db = require("./db");

let express = require('express');
let bodyParser = require('body-parser');

let app = express();

// Add middleware here
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

/**
 * Listen on port 8080 if a port isn't already defined by the environment
 */
app.listen(process.env.PORT || 8080, () => {
    console.log("Braden suxxx at " + (process.env.PORT || 8080));
});

// Conversations

/**
 * TODO: Return the names of all conversations in the database
 */
app.post(paths.conversations.add, (req, res) => {
    const {name} = req.body;

    if (validateBodyParameters(res, name)) {
        db.addConversation(name, buildDatabaseResponseHandler(res));
    }
});


/**
 * TODO: Return the names of all conversations in the database
 */
app.post(paths.conversations.remove, (req, res) => {
    const {name} = req.body;

    if (validateBodyParameters(res, name)) {
        db.removeConversation(name, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the conversation with the given name
 */
app.post(paths.conversations.get, (req, res) => {
    const {name} = req.body;

    if (validateBodyParameters(res, name)) {
        db.getConversation(name, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the names of all conversations in the database
 */
app.get(paths.conversations.all, (req, res) => {
    db.getConversationNames(buildDatabaseResponseHandler(res));
});

// Conversation editing

/**
 * TODO: Return the conversation that was changed
 */
app.post(paths.conversation.updateName, (req, res) => {
    const {oldName, newName} = req.body;

    if (validateBodyParameters(res, oldName, newName)) {
        db.updateConversationName(oldName, newName, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of nodes this affects
 */
app.post(paths.conversation.addNode, (req, res) => {
    const {conversationName, nodeName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName)) {
        db.addConversationNode(conversationName, nodeName, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of nodes this affects
 */
app.post(paths.conversation.removeNode, (req, res) => {
    const {conversationName, nodeName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the list of triggers this affects
 */
app.post(paths.conversation.addTrigger, (req, res) => {
    const {conversationName, word} = req.body;

    if (validateBodyParameters(res, conversationName, word)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the list of triggers this affects
 */
app.post(paths.conversation.removeTrigger, (req, res) => {
    const {conversationName, word} = req.body;

    if (validateBodyParameters(res, conversationName, word)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the list of variables this affects
 */
app.post(paths.conversation.addVariable, (req, res) => {
    const {conversationName, variableName} = req.body;

    if (validateBodyParameters(res, conversationName, variableName)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the list of variables this affects
 */
app.post(paths.conversation.removeVariable, (req, res) => {
    const {conversationName, variableName} = req.body;

    if (validateBodyParameters(res, conversationName, variableName)) {
        res.send({testSuccess: true});
    }
});

// Node Editing

/**
 * TODO: Return the node that was changed
 */
app.post(paths.node.updateName, (req, res) => {
    const {conversationName, nodeName, newName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, newName)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the node that was changed
 */
app.post(paths.node.updateText, (req, res) => {
    const {conversationName, nodeName, text} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, text)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the node with the given name from the given conversation
 */
app.post(paths.node.get, (req, res) => {
    const {conversationName, nodeName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the list of prompts from the node
 */
app.post(paths.node.addPrompt, (req, res) => {
    const {conversationName, nodeName, promptName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, promptName)) {
        res.send({testSuccess: true});
    }


});

/**
 * TODO: Return the list of prompts from the node
 */
app.post(paths.node.removePrompt, (req, res) => {
    const {conversationName, nodeName, promptName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, promptName)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the list of prompts from the node
 */
app.post(paths.node.updatePrompt, (req, res) => {
    const {conversationName, nodeName, promptName, promptText, variableSet} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, promptName, promptText, variableSet)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the list of key words from the node
 */
app.post(paths.node.addKeyWord, (req, res) => {
    const {conversationName, nodeName, keyWord} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, keyWord)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the list of key words from the node
 */
app.post(paths.node.removeKeyWord, (req, res) => {
    const {conversationName, nodeName, keyWord} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, keyWord)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the list of targets from the node
 */
app.post(paths.node.addTarget, (req, res) => {
    const {conversationName, nodeName, targetName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, targetName)) {
        res.send({testSuccess: true});
    }
});

/**
 * TODO: Return the list of targets from the node
 */
app.post(paths.node.removeTarget, (req, res) => {
    const {conversationName, nodeName, targetName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, targetName)) {
        res.send({testSuccess: true});
    }
});

/**
 * Builds a handler function for the database response
 */
const buildDatabaseResponseHandler = (res) =>
{
    return (response) => res.send(response);
};

/**
 * Insures that every argument provided is defined. If not, this will automatically send an error
 * response and return false. Otherwise returns true and does not send a response
 */
const validateBodyParameters = (res, ...args) =>
{
    if (args.findIndex(p => p == undefined) >= 0) {
        res.send({error: 'One or more missing arguments'});
        return false;
    }
    return true;
};