const paths = require("./paths");
const db = require("./db");
const alexa = require("./alexa");

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

/**
 * Alexa do the talk here
 */
app.post(paths.alexa, (req, res) => {
    if (req.body) {
        res.send(alexa(req.body));
    }
    else {
        res.send('There is a problem with this skill');
    }
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
        db.removeConversationNode(conversationName, nodeName, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of triggers this affects
 */
app.post(paths.conversation.addTrigger, (req, res) => {
    const {conversationName, triggerName} = req.body;

    if (validateBodyParameters(res, conversationName, triggerName)) {
        db.addConversationTrigger(conversationName, triggerName, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of triggers this affects
 */
app.post(paths.conversation.removeTrigger, (req, res) => {
    const {conversationName, triggerName} = req.body;

    if (validateBodyParameters(res, conversationName, triggerName)) {
        db.removeConversationTrigger(conversationName, triggerName, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of variables this affects
 */
app.post(paths.conversation.addVariable, (req, res) => {
    const {conversationName, variableName} = req.body;

    if (validateBodyParameters(res, conversationName, variableName)) {
        db.addConversationVariable(conversationName, variableName, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of variables this affects
 */
app.post(paths.conversation.removeVariable, (req, res) => {
    const {conversationName, variableName} = req.body;

    if (validateBodyParameters(res, conversationName, variableName)) {
        db.removeConversationVariable(conversationName, variableName, buildDatabaseResponseHandler(res));
    }
});

// Node Editing

/**
 * TODO: Return the node that was changed
 */
app.post(paths.node.updateName, (req, res) => {
    const {conversationName, nodeName, newName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, newName)) {
        db.updateNodeName(req.body, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the node that was changed
 */
app.post(paths.node.updateText, (req, res) => {
    const {conversationName, nodeName, text} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, text)) {
        db.updateNodeText(req.body, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the node with the given name from the given conversation
 */
app.post(paths.node.get, (req, res) => {
    const {conversationName, nodeName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName)) {
        db.getNode(req.body, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of prompts from the node
 */
app.post(paths.node.addPrompt, (req, res) => {
    const {conversationName, nodeName, promptName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, promptName)) {
        db.addPrompt(req.body, buildDatabaseResponseHandler(res));
    }


});

/**
 * TODO: Return the list of prompts from the node
 */
app.post(paths.node.removePrompt, (req, res) => {
    const {conversationName, nodeName, promptName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, promptName)) {
        db.removePrompt(req.body, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of prompts from the node
 */
app.post(paths.node.updatePrompt, (req, res) => {
    const {conversationName, nodeName, promptName, promptText, variableSet} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, promptName, promptText, variableSet)) {
        db.updatePrompt(req.body, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of key words from the node
 */
app.post(paths.node.addKeyWord, (req, res) => {
    const {conversationName, nodeName, keyWord} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, keyWord)) {
        db.addKeyWord(req.body, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of key words from the node
 */
app.post(paths.node.removeKeyWord, (req, res) => {
    const {conversationName, nodeName, keyWord} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, keyWord)) {
        db.removeKeyWord(req.body, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of targets from the node
 */
app.post(paths.node.addTarget, (req, res) => {
    const {conversationName, nodeName, targetName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, targetName)) {
        db.addTarget(req.body, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return the list of targets from the node
 */
app.post(paths.node.removeTarget, (req, res) => {
    const {conversationName, nodeName, targetName} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, targetName)) {
        db.removeTarget(req.body, buildDatabaseResponseHandler(res));
    }
});

/**
 * TODO: Return all nodes in the conversation
 */
app.post(paths.node.updatePosition, (req, res) => {
    const {conversationName, nodeName, x, y} = req.body;

    if (validateBodyParameters(res, conversationName, nodeName, x, y)) {
        db.updateNodePosition(req.body, buildDatabaseResponseHandler(res));
    }
});

app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

app.get('/*', (req, res) => {
    res.redirect('/');
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
