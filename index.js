
var express = require('express');
var app = express();


/**
 * Landing page. This is where the front-end is served from
 */
app.get('/', (req, res) => {
    res.send('<h1>Braden Suxxxxx</h1>');
});

/**
 * Listen on port 8080 if a port isn't already defined by the environment
 */
app.listen(process.env.PORT || 8080, () => {
    console.log('Iz Working');
});