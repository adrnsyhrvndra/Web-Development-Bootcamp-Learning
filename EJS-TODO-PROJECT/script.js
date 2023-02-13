const express = require("express");

const bodyParser = require('body-parser');

const app = express();

const date = require(__dirname + "/date.js")

// Taruh app.set('view engine', 'ejs'); dibawahnya const app = express

app.set('view engine', 'ejs');

// Activate Body Parser

app.use(bodyParser.urlencoded({extended:true}));

// Dengan express static supaya css dan img nya kebaca semua.hampir sama lah ya kaya laravel.

app.use(express.static("public"));

let items = [];

let workItems = [];

app.get("/",function(req,res) {

    let day = date.getDate();

    res.render('list', {
        
        listTitle: day,
        newListItems: items
    
    });

});

app.get("/work",function (req,res) {
    
    res.render("list",{

        listTitle:"Work List",
        newListItems : workItems

    })

});

app.get("/about",function (req,res) {
    
    res.render("about");

});

app.post("/",function (req,res) {
    
    let item = req.body.newItem;

    if (req.body.list === "Work" ) {
        
        workItems.push(item);

        res.redirect('/work');

    } else{

        items.push(item);
    
        res.redirect('/');

    }

})

app.listen(4000,function () {
    
    console.log("Server Is Running On Port 4000");

});