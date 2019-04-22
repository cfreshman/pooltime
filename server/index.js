const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;
app.use(bodyParser.json()); // parses JSON requests

// log errors
app.use((err, req, res, next) => {
    console.log(err);
    next();
});

// log timestamped url requests
app.use((req, res, next) => {
    console.log(String(Date.now()), req.method, req.originalUrl);
    next();
});

app.use('/api/events', require('./events').routes);

// start server
app.listen(port, () => {
    console.log(`App started on port ${port}`);
});