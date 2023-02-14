const express = require("express");

const bodyParser = require('body-parser');

const _ = require('lodash');

const app = express();

const date = require(__dirname + "/date.js")

// Taruh app.set('view engine', 'ejs'); dibawahnya const app = express

app.set('view engine', 'ejs');

// Activate Body Parser

app.use(bodyParser.urlencoded({extended:true}));

// Dengan express static supaya css dan img nya kebaca semua.hampir sama lah ya kaya laravel.

app.use(express.static("public"));


// ============================================
// =========== CONNECT MONGODB ================
// ============================================

const mongoose = require('mongoose');

//connect to MongoDB by specifying port to access MongoDB server

main().catch(err => console.log(err));

async function main() {

    mongoose.set('strictQuery', false);

    await mongoose.connect("mongodb://127.0.0.1/todolistDB");

};

// ============================================
// ======== CREATE TABLE SCHEMA TO DO LIST
// ============================================

const toDoListSchema = new mongoose.Schema({

    name:{

        type:String,
        required:[true,"Please Check Again Is Required"]

    }

});

// Item Model

const Item = mongoose.model("Item", toDoListSchema);

const Item1 = new Item({

    name: "Welcome To Your To Do List"

});

const Item2 = new Item({

    name: "Hit the + button to add a new item."

});

const Item3 = new Item({

    name: "<== Hit this to delete an item"

});

const defaultItems = [Item1,Item2,Item3];

// ============================================
// ======== CREATE TABLE SCHEMA WORKLIST
// ============================================

const listSchema = new mongoose.Schema({

    name:{

        type:String,
        required:[true,"Please Check Again Is Required"]

    },

    items: [toDoListSchema]

});

// Item Model

const List = mongoose.model("List", listSchema);

// ============================================
// ======== ROUTE APP
// ============================================

app.get("/",function(req,res) {

    // ============================= 
    // FIND AND READ DATA
    // ============================= 

    Item.find({},function(err,foundItems){

        if (foundItems.length === 0) {
            
            Item.insertMany(defaultItems,function(err) {
    
                    if(err){
            
                    console.log(err);
            
            } else{
            
                    console.log("Succesfully saved all the item into db");
            
            }
            
            });

            res.redirect("/");

        } else {
            
            res.render('list', {
        
                listTitle: "Today",
                newListItems: foundItems
            
            });

        }

    });

});

app.get("/:customListName",function(req,res) {
    
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name:customListName},function(err,foundList) {
        
        if(!err){

            if(!foundList){

                // console.log("Does'nt Exist");

                const list = new List({

                    name: customListName,
                    items: defaultItems
            
                });
            
                list.save();

                res.redirect("/" + customListName);

            } else{

                // console.log("Exist");

                res.render("list",{
        
                    listTitle: foundList.name,
                    newListItems: foundList.items
                
                });

            }

        }

    });

})

app.get("/about",function (req,res) {
    
    res.render("about");

});

app.post("/",function (req,res) {
    
    const itemName = req.body.newItem;
    const ListName = req.body.list;

    const item = new Item({

        name: itemName

    });

    if (ListName === "Today") {
        
        item.save();

        res.redirect("/");

    } else {
        
        List.findOne({name:ListName},function(err,foundList){

            foundList.items.push(item);

            foundList.save();

            res.redirect("/" + ListName );

        });

    }

});

app.post("/delete",function(req,res){

    const checkItemId = req.body.checkbox;

    const listName = req.body.listName;

    if (listName === "Today") {
        
        Item.findByIdAndRemove(checkItemId.trim(),function(err) {
    
            if(!err){
    
                console.log("Succesfully Deleted Checked Item");

                res.redirect("/");
    
            } else{

                console.log(err);

            }
    
        });

    } else{

        List.findOneAndUpdate({name:listName},{$pull:{items: {_id:checkItemId.trim()}}},function(err,foundList){

            if (!err) {

                console.log("Succesfully Deleted Antoher Page Checked Item");
                
                res.redirect("/" + listName);

            }

        });

    }

});

app.listen(4000,function () {
    
    console.log("Server Is Running On Port 4000");

});