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

app.post(paths.conversations.add, (req, res) => {
    db.newConversation(req.body.name, (response) => {
        res.send(response);
    })
});

/**
 * Gets the names of all conversations to send to the UI
 */
app.get(paths.conversationRoot, (req, res) => {
    db.conversationNames((response) => {
        res.send(response);
    })
});

/**
 * Landing page. This is where the front-end is served from
 */
app.get(paths.index, (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});