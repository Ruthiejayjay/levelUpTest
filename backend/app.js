const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const validationRoutes = require('./routes/validation-routes');

const app = express();

//app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requestted-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PATCH, DELETE'
    )
    next();
});

app.use('/api/validation', validationRoutes);

app.use((req, res, next) => {
    res.status(404).json({ message: 'Could not find this route' })
});

mongoose
    .connect('mongodb+srv://levelUp:wLnx49wAnhXD8CLz@cluster0.vlfvq.mongodb.net/levelup_test?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000);
    })