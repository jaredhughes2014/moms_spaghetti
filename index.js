
var express = require('express');
var bodyParser = require('body-parser');
var dungeon = require('./dungeon.js');

var app = express();

// Add middleware here
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(express.static('public'));

/**
 * Landing page. This is where the front-end is served from
 */
app.get('/', (req, res) => {
    res.sendFile('public/index.html', { root: __dirname });
});

/**
 * Endpoint for alexa. This is where the user's text will be input for processing
 */
app.post('/speak', (req, res) => {
    if (req.body) {
        console.log(req.body);
        res.send(dungeon(req.body));
    }
    else {
        res.send('There is an error with this skill');
    }
});

/**
 * Listen on port 8080 if a port isn't already defined by the environment
 */
app.listen(process.env.PORT || 8080, () => {
    console.log('Iz Working at ' + (process.env.PORT || 8080));
});
