
// JS HINT ES6

const express = require('express');

const app = express();

const port = 3000;

app.get('/', (req, res) => {

    // console.log(req);

    res.send('<h1>Hello World!</h1>');

});

app.get('/contact', (req, res) => {

    // console.log(req);

    res.send('<h1>This is Home Page!</h1>');

});

app.get('/about', (req, res) => {

    // console.log(req);

    res.send('<h1>This is About Page : Test!</h1>');

});

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`);

});