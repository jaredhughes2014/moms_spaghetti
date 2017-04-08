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
 * Adds a new conversation to the database
 */
app.post(paths.conversations.add, (req, res) => {
    const {name} = req.body;

    if (validateBodyParameters(res, name)) {
        res.send({testSuccess: true});
    }
});

/**
 * Removes an existing conversation from the database
 */
app.post(paths.conversations.remove, (req, res) => {
    const {name} = req.body;

    if (validateBodyParameters(res, name)) {
        res.send({testSuccess: true});
    }
});

/**
 * Gets a specific conversation from the database
 */
app.get(paths.conversations.get, (req, res) => {
    const {name} = req.body;

    if (validateBodyParameters(res, name)) {
        res.send({testSuccess: true});
    }
});

/**
 * Gets all conversations from the database
 */
app.get(paths.conversations.all, (req, res) => {
    res.send({testSuccess: true});
});

// Conversation editing

/**
 * Updates the name of a conversation
 */
app.post(paths.conversation.updateName, (req, res) => {
    const {oldName, newName} = req.body;

    if (validateBodyParameters(res, oldName, newName)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.conversation.addNode, (req, res) => {
    const {conversationName, nodeName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.conversation.removeNode, (req, res) => {
    const {conversationName, nodeName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.conversation.addTrigger, (req, res) => {
    const {conversationName, triggerName} = req.body;

    if (validateBodyParameters(res, conversationName, triggerName)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.conversation.removeTrigger, (req, res) => {
    const {conversationName, triggerName} = req.body;

    if (validateBodyParameters(res, conversationName, triggerName)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.conversation.addVariable, (req, res) => {
    const {conversationName, variableName} = req.body;

    if (validateBodyParameters(res, conversationName, variableName)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.conversation.removeVariable, (req, res) => {
    const {conversationName, variableName} = req.body;

    if (validateBodyParameters(res, conversationName, variableName)) {
        res.send({testSuccess: true});
    }
});

// Node Editing

/**
 *
 */
app.post(paths.node.updateName, (req, res) => {
    const {conversationName, nodeName, newName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, newName)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.node.updateText, (req, res) => {
    const {conversationName, nodeName, text} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, text)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.node.addPrompt, (req, res) => {
    const {conversationName, nodeName, promptName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, promptName)) {
        res.send({testSuccess: true});
    }


});

/**
 *
 */
app.post(paths.node.removePrompt, (req, res) => {
    const {conversationName, nodeName, promptName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, promptName)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.node.updatePrompt, (req, res) => {
    const {conversationName, nodeName, promptName, promptText, variableSet} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, promptName, promptText, variableSet)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.node.addKeyWord, (req, res) => {
    const {conversationName, nodeName, keyWord} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, keyWord)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.node.removeKeyWord, (req, res) => {
    const {conversationName, nodeName, keyWord} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, keyWord)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.node.addTarget, (req, res) => {
    const {conversationName, nodeName, targetName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, targetName)) {
        res.send({testSuccess: true});
    }
});

/**
 *
 */
app.post(paths.node.removeTarget, (req, res) => {
    const {conversationName, nodeName, targetName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, targetName)) {
        res.send({testSuccess: true});
    }
});

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