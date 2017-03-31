
let express = require('express');
let bodyParser = require('body-parser');
let dungeon = require('./src/server/dungeon.js');

const api = require('./src/server/api');
const paths = require('./src/paths');

let app = express();

// Add middleware here
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

/**
 * Landing page. This is where the front-end is served from
 */
app.get(paths.index, (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

/**
 * Endpoint for alexa. This is where the user's text will be input for processing
 */
app.post(paths.speak, (req, res) => {
    if (req.body) {
        console.log(req.body);
        res.send(dungeon(req.body));
    }
    else {
        res.send('There is an error with this skill');
    }
});

/**
 * Fetches all conversations for the current user (the only user for this project)
 */
app.get(paths.conversations.get, (req, res) => {
    api.getConversations((conversations) => {
       res.send(conversations);
    });
});

/**
 * Saves the given conversation in the "database"
 */
app.post(paths.conversations.save, (req, res) => {
    api.saveConversation(req.body, (response) => {
        res.send(response);
    });
});

/**
 * Adds a new conversation to the "database"
 */
app.post(paths.conversations.add, (req, res) => {
    api.addConversation(req.body.name, (conversation) => {
        res.send(conversation);
    });
});

/**
 * Removes a conversation from the database
 */
app.delete(paths.conversations.delete, (req, res) => {
    api.removeConversation(req.body.name, (response) => {
        res.send(response);
    });
});

/**
 * Listen on port 8080 if a port isn't already defined by the environment
 */
app.listen(process.env.PORT || 8080, () => {
    console.log('Iz Working at ' + (process.env.PORT || 8080));
});
