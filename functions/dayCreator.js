import {getRandomInt,addSomeDays} from "./_common";

const
    Dayplan = require('../models/Dayplans'),
    Recipe = require('../models/Recipe'),
    Weekplan = require('../models/Weekplans');

/*THIS MODULE CREATES A CURRENT DAY DATA
* and then sends it as a response to frontend*/

/*create an initial date for a dayplan fetching*/
let today = new Date();
today.setHours(0,0,0,0);
const tommorow = addSomeDays(today,1);
today = tommorow

/*main goals are
* 1. Fetch current day from database
* 2. Check if it's grocery day or not
* 3. Check if there are some todos from next day or evening day (
* 3. If it is - create grocerie list for today
* 4. check if some of the recipes in a day object were already cooked today
* 5. The result of this module will be an object, containing
*   a. the next uncooked recipe for today
*   b. reminders, if there are any
*   c. todos, if there are any*/

export const dayCreator = async function() {
    let todaysRecipes = [];
    let prepStepsY =[],prepStepsM = [];
    await Dayplan.findOne({date:addSomeDays(today,1)},(err,todaysDay)=> {
        if (err) {
            console.log('error in fetching today dayplan in dayCreator\n', err)
        } else {
            todaysDay.meals.forEach(meal=>{
                todaysRecipes.push(meal.recipe)
            })
        }
    });
    console.log(todaysRecipes);

    const arrayofPromises = todaysRecipes.map( id=>{
        return Recipe.findOne({_id:id}).exec()
    });
    const data = await Promise.all(arrayofPromises);
    data.forEach(recipe=>{
        recipe.prepSteps.forEach(step=>{
            if(step.yesterday===true){
                prepStepsY.push(step.step)
            } else {
                prepStepsM.push(step.step)
            }
        })
    });
    await Dayplan.findOne({date:today},(err,todayDayplan)=>{
        if(!err){
            todayDayplan.todosY = prepStepsY;
            todayDayplan.todosM = prepStepsM;
            todayDayplan.save()
                .then(editedDayplan=>{
                    console.log(editedDayplan)
                })
        }
    })



/*
        .exec(async (err,todaysDay)=>{
            if(err){
                console.log('error in fetching today dayplan in dayCreator\n',err)
            } else {
                console.log(todaysDay.meals)
            }
        });
*/


};