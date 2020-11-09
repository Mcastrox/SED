const express = require('express');

const mongoose = require('mongoose');

const Flight = mongoose.model('Flight');

const router = express.Router();

router.get("/", (req,res) => {
    res.render("addOrEdit", {
        viewTitle: "Detalle de vuelos"
    })
})

router.post("/", (req,res)=> {
    if(req.body._id == "")
    {
        insertRecord(req,res);
    }
    else{
        updateRecord(req, res);
    }
})

function insertRecord(req,res){
    var flight = new Flight();

    flight.destination = req.body.destination;
    flight.price = req.body.price;

    flight.save((err, doc) => {
        if(!err){
            res.redirect('list');
        }
        else{

            if(err.name == "ValidationError"){
                handleValidationError(err, req.body);
                res.render("addOrEdit", {
                    viewTitle: "Destino",
                    flight: req.body
                })
            }
            console.log("Error occured during record insertion" + err);
        }
    })
}

function updateRecord(req,res){
    Flight.findOneAndUpdate({_id:req.body._id,},req.body,{new:true},(err,doc) => {
       if(!err){
           res.redirect('list');
       }
       else{
           if(err.name == "ValidationError"){
               handleValidationError(err,req.body);
               res.render("addOrEdit", {
                   viewTitle: 'Actualizar',
                   flight: req.body
               });
           }
           else{
               console.log("Error occured in updating the record", +err);
           }
       }
    })
}

router.get('/list', (req,res) => {
    Flight.find((err, docs) => {
        if(!err) {
            res.render("list", {
                list:docs
            })
        }
    })
})

router.get('/:id',(req,res) => {
    Flight.findById(req.params.id,(err,doc) => {
    if(!err){
        res.render("addOrEdit", {
            viewTitle: "Actualizar",
            flight: doc
        })
    }
})
})

router.get('/delete/:id', (req,res)=>{
    Flight.findByIdAndRemove(req.params.id, (err,doc)=>{
        if(!err){
            res.redirect('/list');
        }
        else{
            console.log("An error occured during the Delete Process" + err)
        }
    })
})

module.exports = router;