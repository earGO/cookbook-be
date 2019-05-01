const mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    passport = require('passport');

require('../models/Areas');
require('../models/Categories');

const Area = mongoose.model('areas');
const Category = mongoose.model('categories');


//contorollers functions
const
    areas = function (req, res) {
        Area.find({},(err,allAreas)=>{
            if(err){
                console.log('error fetching all areas in areas-function in search-controller')
            } else {
                console.log('successfully fetched all areas in areas-function in search-controller');
                res.send(allAreas)
            }
        })
    },
    categories = function (req, res) {
        Category.find({},(err,allCategories)=>{
            if(err){
                console.log('error fetching all categories in categories-function in search-controller')
            } else {
                console.log(
                    'successfully fetched all categories in categories-function in search-controller'
                );
                res.send(allCategories)
            }
        })
    };



module.exports = {
   areas,
    categories
}