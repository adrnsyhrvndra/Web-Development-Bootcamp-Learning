
const express = require("express");

const https = require('node:https');

const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({

    extended:true

}));

app.get("/",function(req,res) {

    res.sendFile(__dirname + "/index.html");

});

app.post("/",function(req,res) {

    // Kalau body karena sudah pake package body parser

    // Kalau City itu berasal dari name input di index.html
    
    var city = req.body.city;
    
    var appid = "30463e17b97d793c212d3a42c6a3ec8c";
    
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appid;
    
    https.get(url, (response) => {
    
        console.log('statusCode:', response.statusCode);
    
        console.log('headers:', response.headers);
    
        response.on('data', (data) => {
    
            const weatherData = JSON.parse(data);
    
            const temp = weatherData.main.temp;
    
            const weatherDescription = weatherData.weather[0].description;
    
            const weatherIcon = weatherData.weather[0].icon;
    
            const imageURL = "http://openweathermap.org/img/wn/"+ weatherIcon +"@2x.png";
    
            res.write("<h1>The Temperature In : " + city +  " Is " + temp + " degrees celcius</h1>");
    
            res.write("<p>The Weather Is Currently : " + weatherDescription + "</p>");
    
            res.write("<img src="+ imageURL + ">")
    
            res.send();
        
    });
    
    }).on('error', (e) => {
        
        console.error(e);
    
    });

});


app.listen(3000,function () {
    
    console.log("Server Is Running On Port 3000");

});