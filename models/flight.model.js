const mongoose = require('mongoose');

var flightSchema = new mongoose.Schema({
    destination:{
        type: String
    },
    price:{
        type: String
    }
})

mongoose.model('Flight', flightSchema);
