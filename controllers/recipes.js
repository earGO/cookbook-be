const mongoose = require('mongoose');

require('../models/Recipe');

const Recipe = mongoose.model('recipes');


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
                console.log('successfully fetched recipe',recipe);
                res.send(recipe);
            }
        })

};


module.exports = {
    getAll,
    getOne
};