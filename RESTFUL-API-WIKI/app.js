//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//connect to MongoDB by specifying port to access MongoDB server

main().catch(err => console.log(err));

async function main() {

    mongoose.set('strictQuery', false);

    await mongoose.connect("mongodb://127.0.0.1:27017/wikiDB");

};

// ARTICLE SCHEMA

const articleSchema = {

    title:String,
    content: String

};

const ArticleModel = mongoose.model("Article",articleSchema);

// APP ROUTE ARTICLES

app.route("/articles")

.get(function(req,res) {
    
    ArticleModel.find(function(err,foundArticles) {

        if (!err) {
            
            res.send(foundArticles);

        } else {
            
            res.send(err);

        }

    })

})

.post(function(req,res) {

    const newArticle = new ArticleModel({

        title: req.body.title,
        content: req.body.content

    });

    newArticle.save(function(err) {

        if (!err) {
            
            res.send("Succesfully Added A New Data");

        } else {
            
            res.send(err);
            
        }
        
    });

})

.delete(function(req,res) {
    
    ArticleModel.deleteMany(function(err) {
    
        if (!err) {
            
            res.send("Succesfully deleted all articles");

        } else{

            res.send(err);

        }
        
    });

});

// ROUTE REQUEST SPECIFIC ARTICLES

app.route("/articles/:articleTitle")

.get(function(req,res) {
    
    ArticleModel.findOne({title:req.params.articleTitle},function(err,foundArticles) {
        
        if(foundArticles){

            res.send(foundArticles);

        } else{

            res.send("No Articles Matching Found");

        }

    });

})

.put(function(req,res) {
    
    ArticleModel.replaceOne({title: req.params.articleTitle},{title:req.body.title,content:req.body.content},{overwrite:true},function(err) {
    
        if(!err){

            res.send("Successfully update Aritcle");

        }else{

            res.send(err);

        }

    });

})

.patch(function(req,res){

    ArticleModel.updateOne(
        
        {title: req.params.articleTitle},
        {$set : req.body},
        function(err) {
            
            if (!err) {
                
                res.send("Successfully updated article with updateOne.");

            }
                
            else { 
                
                res.send(err); 
            
            }  

        }
        
    );

})

.delete(function(req,res) {
    
    ArticleModel.deleteOne(

        {title: req.params.articleTitle},
        function (err) {
            
            if (!err) {
                
                res.send("Successfully deleted article with deleteOne.");

            }
                
            else { 
                
                res.send(err); 
            
            }  

        }
    
    );

});

// LISTEN

app.listen(3000, function() {

    console.log("Server started on port 3000");

});