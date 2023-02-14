const mongoose = require('mongoose');

//connect to MongoDB by specifying port to access MongoDB server

main().catch(err => console.log(err));

async function main() {

    mongoose.set('strictQuery', false);

    await mongoose.connect("mongodb://127.0.0.1/fruitsDB");

}

// ====================================================== 


// CREATE TABLE

const fruitSchema = new mongoose.Schema({

    name:{

        type:String,
        required:[true,"Please Check Again Is Required"]

    },
    rating:{

        type:Number,
        min:1,
        max:10

    },
    review:String

});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({

    name:"Apple",
    rating:7,
    review:"Pretty Delicious"

});

// INSERT DATABASE

// fruit.save();

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema
});

//create a MODEL

const Person = mongoose.model('Person', personSchema);

//create a DOCUMENT

const pinneaple = new Fruit({

    name:"Pinneaple",
    rating:9,
    review:"Spongebob Fruit"

});

const person = new Person({
    name: "Amy",
    age: 37,
    favouriteFruit : pinneaple
});

pinneaple.save();

person.save();

// Menambah Buah Kiwi Dan Banana

const kiwi = new Fruit({

    name :"Kiwi",
    rating : 10,
    review:"Pretty Salty And Sweet"

});

const banana = new Fruit({

    name :"Banana",
    rating : 6,
    review:"Pretty Sweet"

});

// Fruit.insertMany([kiwi,banana],function(err){

//     if(err){

//         console.log(err);

//     } else{

//         console.log("Succesfully saved all the fruits into fruit collection");

//     }

// });

// ============================= 
// FIND DOCUMENT
// ============================= 

Fruit.find(function(err,fruits){

    if(err){

        console.log(err);

    } else{

        // console.log(fruits);

        fruits.forEach(function(fruit) {
            
            console.log(fruit.name);
            
        })
        
        mongoose.connection.close();
    }

});

// ============================= 
// UPDATE DATA
// ============================= 

// Fruit.updateOne({

//     _id:"63eb55c54c21b55695ee6559"

// },{

//     name:"Jambu"

// },function (err) {

//     if(err){

//         console.log(err);

//     }else{

//         console.log("Succes To Update");

//     }

// });


// ============================= 
// DELETE DATA
// ============================= 

// Fruit.deleteOne({name:"Jambu"},function(err) {
    
//     if(err){

//         console.log(err);

//     }else{

//         console.log("Succes To Delete");

//     }

// });