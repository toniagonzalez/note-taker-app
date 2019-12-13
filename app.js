//Create express app
const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const app = express();
const routes = require('./routes')

//set port
const port = process.env.PORT || 5000;

//parse applications/json
app.use(bodyparser.json());

//setup morgan for http request logging
app.use(morgan('dev'));

//api routes here
app.use('/api', routes);

//redirect to api routes
app.get('/', (req, res) => {
    res.redirect('/api');
})

//handler for 404 status
app.use((req, res) => {
    res.status(404).json({
        "message": "Route not Found",
    })
})

//error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        error: {},
    })
})

// start listening on port
app.listen(port, () => {
    console.log(`Express server is listening on port ${port}!`);
});


