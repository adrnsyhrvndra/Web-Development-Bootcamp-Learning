
const express = require('express');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

const port = 3000;

app.get('/', (req, res) => {

    // res.send('Hello Test!');

    res.sendFile(__dirname + "/index.html");

});

app.post("/",(req, res) => {

    var num1 = Number(req.body.n1);
    var num2 = Number(req.body.n2);

    var result = num1 + num2;

    res.send("The Result is : " + result);

});

// ===================== BMI CALC

app.get('/bmicalculator', (req, res) => {

    // res.send('Hello Test!');

    res.sendFile(__dirname + "/bmiCalculator.html");

});

app.post("/bmicalculator",(req, res) => {

    var weightINP = parseFloat(req.body.weight);
    var heightINP = parseFloat(req.body.height);

    var bmi = weightINP / (heightINP * heightINP);

    res.send("The Result is : " + bmi);

});

app.listen(port, () => {

    console.log(`Example app listening on port ${port}`);

});