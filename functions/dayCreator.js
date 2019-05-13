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
const tommorow = addSomeDays(today,3);
today = tommorow

/*main goals are

*
*

* 6. check if some of the recipes in a day object were already cooked today
*
* 7. The result of this module will be an object, containing
*   a. the next uncooked recipe for today
*   b. reminders, if there are any
*   c. todos, if there are any*/

export const dayCreator = async function() {
    const DATES_ARRAY=[today,addSomeDays(today,1)];

   /*retrieve today's day as sync object for easing of the work*/
    /*first check if today's day has todosY and todosM, not to do unnesessary work*/
    const arrayOfDaysPromises = DATES_ARRAY.map(date=>{
        return Dayplan.findOne({date:date}).exec()
    })
    const TWO_DAYS = await Promise.all(arrayOfDaysPromises);
    const TODAY = TWO_DAYS[0];

    /*2. Check if it's todosY and todosM filled (no recipe has empty todosM)
    * 3. Fill if not. If none of recipes has any preparation time - fill with 'no prep needed' single value*/
    await TWO_DAYS.forEach(async day=>{
        /*variables for filling todos from tommorow and from today*/
        let todaysRecipes = [],
            prepStepsY =[],
            prepStepsM = [];
        if(!day.todosY.length||!day.todosM.length){
            day.meals.forEach(meal=>{
                todaysRecipes.push(meal.recipe)
            });
            /*fill preparation steps from tommorow and from */
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
            /*fill the day with data after preparing it*/
            await Dayplan.findOne({date:today},(err,todayDayplan)=>{
                if(!err){
                    console.log(Dayplan)
                    todayDayplan.todosY = prepStepsY;

                    todayDayplan.todosM = prepStepsM;

                    todayDayplan.save()
                        .then(editedDayplan=>{
                            console.log(editedDayplan)
                        })
                }
            })
        }

    });

    /** 4. Check if it's grocery day or not
     * 5. If it is - create grocerie list for today
     * made through terrible KOSTYL for now not to be stuck
     **/
    /*variable for all sources of groceries for the list*/
    let groceriesSourses = [];
    /*variables to stop cycling through dayplans in search of a next groceryDay*/
        let searchDatesArray = [];
        let nextGroceryDay = false
    if(TODAY.groceryDay){
            /*create array of dates to cycle through in search of next grocery day*/
        for(let i=1;i<14;i++){
            searchDatesArray.push(addSomeDays(today,i))
        }
        const arrayOfSearchPromises = searchDatesArray.map(singleDate=>{
            return Dayplan.find({date:singleDate}).exec()
        });
        const searchDays = await Promise.all(arrayOfSearchPromises);

        /*Cycle through array until next grocery day found*/
        searchDays.map(singleDay=>{
            if(singleDay.length && !nextGroceryDay){
                console.log(singleDay[0].groceryDay)
                groceriesSourses.push(singleDay[0].meals)
                if(singleDay[0].groceryDay){
                    console.log('found groceryDay');
                    nextGroceryDay = true;
                }
            }
        });
        /*rework this array, so it only contains recipes IDs*/
        let ingredSourceFinal = [];
        groceriesSourses.map(singleSource=>{
            singleSource.map(singleRecipe=>{
                ingredSourceFinal.push(singleRecipe.recipe)
            });
        });
        /*create sync array of Recipes data to work with*/
        const arrayOfRecipePromises = ingredSourceFinal.map(source=>{
            console.log(source)
            return Recipe.findOne({_id:source}).exec()
        });
        console.log(arrayOfRecipePromises)
        const RECIPE_SOURCE_DATA = await Promise.all(arrayOfRecipePromises);
        /*compose ingreds arrays*/

        /*add ingreds from first recipe*/

        /*cycle through other recipes - if found new ingred, add it;
        * if found existing ingred - sum amounts*/

        /*save prepared grocery list*/
    }

};