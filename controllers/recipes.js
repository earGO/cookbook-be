const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

require('../models/Recipe');

const Recipe = mongoose.model('recipes');

const currentId = new ObjectId("5cc724bd77767702e3f87c0a")


//contorollers functions
const
    getAll = function (req, res, next) {
        Recipe.find({},(err,allRecipes)=>{
            if(err){
                console.log('error fetching recipes')
            } else {
                console.log('successfully fetched all recipes');
                res.send(allRecipes);
            }
        })
    },
    getOne = function (req,res,next) {
        Recipe.findOne({
            _id:req.params.id
        }, (err,recipe)=>{
            if(err){
                console.log('error fetching recipe\n',err)
            } else {
                console.log('successfully fetched recipe');
                res.send(recipe);
            }
        })

},
    current = function (req,res,next) {
    console.log(currentId)
        Recipe.find({
                _id:req.params.id
        },(err,recipe)=>{
            if(err){
                console.log('error fetching current recipe\n',err);
            } else {
                console.log('fetched current recipe');
                res.send(recipe);
            }
        })
};


module.exports = {
    getAll,
    getOne,
    current
};