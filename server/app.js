const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.json())
app.use(cors())

app.use(require('./routes'))

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const message = err.message || "Something went wrong"
    return res.status(status).json({
        success: false,
        status,
        message
    })
})

module.exports = app;