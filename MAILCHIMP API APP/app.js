const express = require("express");

const mailchimp = require("@mailchimp/mailchimp_marketing");
const bodyParser = require('body-parser');

// f063e428a684ca80c162c2db788408d2-us21 API KEY

// 144c3e7a6f AUDIENCE ID

const app = express();

// Dengan express static supaya css dan img nya kebaca semua.hampir sama lah ya kaya laravel.

app.use(express.static("public"));

// Activate Body Parser

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res) {

    res.sendFile(__dirname + "/signup.html");

});

app.listen(process.env.PORT || 3000,function () {
    
    console.log("Server Is Running On Port 3000");

});

//========================= Setting up MailChimp ==============================

mailchimp.setConfig({

    apiKey: "f063e428a684ca80c162c2db788408d2-us21",
    server: "us21"

});

app.post("/",function (req,res) {
    
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.emailInput;

    const listId = "144c3e7a6f";

    const subscribingUser = {
            
        firstname: firstName, 
        
        lastname: lastName, 
        
        email: email
    
    };

    async function run() {

        const response = await mailchimp.lists.addListMember(listId, {

            email_address: subscribingUser.email,
            
            status: "subscribed",
            
            merge_fields: {
            
            FNAME: subscribingUser.firstname,
            
            LNAME: subscribingUser.lastname,
            
            },
            
        });
    
        res.sendFile(__dirname + "/success.html");

        console.log(

            `Successfully added contact as an audience member. The contact's id is ${response.id}.`

        );

    }

    run().catch((e) => res.sendFile(__dirname + "/failure.html"));
        
});