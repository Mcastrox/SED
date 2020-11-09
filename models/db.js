const mongoose = require('mongoose');

const url = "mongodb+srv://grupo38:grupo38SED@cluster0.8jo95.mongodb.net/test";

mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true,
useFindAndModify: false, useCreateIndex: true}, (err) => {
    if(!err){ console.log("MongoDB Connection Succeeded");}
    else{
        console.log("An Error Occured");
    }
})

require('./flight.model');