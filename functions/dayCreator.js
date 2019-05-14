import { getRandomInt,addSomeDays,arrayConvoluter,objectClone } from "./_common";

const
    Dayplan = require('../models/Dayplans'),
    Recipe = require('../models/Recipe'),
    Weekplan = require('../models/Weekplans'),
    ActualDay = require('../models/ActualDay'),
    Reminder = require('../models/Reminders');

/*THIS MODULE CREATES A CURRENT DAY DATA
* and then sends it as a response to frontend*/

/*create an initial date for a dayplan fetching*/
let today = new Date();
today.setHours(0,0,0,0);
const tommorow = addSomeDays(today,3);

/**main goals are
When FrontEnd sends first request for Day's data, it happens from Dashboard (first start screen).
 This module checks, if all data needed is avaliable - and does some job if it's not
 It then makes DashboardDay object and sends it back to FE.

 It is important, that User ALWAYS started from dashboard. And Dashboard is main working screen for day-to-day use
 anyways.

 When User needs to manage dayplans, or weekplans, he sends another request from another screen, and this job does
 another module.

*/

export const dayCreator = async function() {
    const DATES_ARRAY=[today,addSomeDays(today,1)];
   /*retrieve today's day as sync object for easing of the work*/
    /*first check if today's day has todosY and todosM, not to do unnesessary work*/
    const arrayOfDaysPromises = DATES_ARRAY.map(date=>{
        return Dayplan.findOne({date:date}).exec()
    })
    const TWO_DAYS = await Promise.all(arrayOfDaysPromises);
    const TODAY = TWO_DAYS[0];
    const TOMMOROW = TWO_DAYS[1];
    /*2. Check if it's todosY and todosM filled (no recipe has empty todosM)
    * 3. Fill if not. If none of recipes has any preparation time - fill with 'no prep needed' single value*/
    await TWO_DAYS.forEach(async day=>{
        /*variables for filling todos from tommorow and from today*/
        let todaysRecipes = [],
            prepStepsY =[],
            prepStepsM = [],
            dayDate = day.date;
        if(!day.todosY.length||!day.todosM.length){
            console.log('\n/*+++++++++++++++++++++++++++*/\nediting day\n',day);
            console.log('have date: ',dayDate);
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
            await Dayplan.findOne({date:dayDate},(err,todayDayplan)=>{
                if(!err){
                    todayDayplan.todosY = prepStepsY;
                    todayDayplan.todosM = prepStepsM;
                    todayDayplan.save()
                        .then(editedDayplan=>{
                            console.log('edited todosY and todosM in dayplan')
                        })
                }
            })
        }

    });

    /** 4. Check if it's grocery day or not & if there already is Groceries list
     * 5. If it is - create grocerie list for today
     * made through terrible CRUTCH for now not to be stuck
     **/
    /*variable for all sources of groceries for the list*/
    let groceriesSourses = [];
    /*variables to stop cycling through dayplans in search of a next groceryDay*/
        let searchDatesArray = [];
        let nextGroceryDay = false
    if(TODAY.groceryDay && !TODAY.groceries.length){
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
            return Recipe.findOne({_id:source}).exec()
        });
        const RECIPE_SOURCE_DATA = await Promise.all(arrayOfRecipePromises);
        /*compose ingreds arrays*/
        let groceries = [];
        RECIPE_SOURCE_DATA.map(recipe=>{
            recipe.ingredients.map(singleIngredient=>{
                let ingredName = singleIngredient.name,
                    ingredAmount = singleIngredient.measure.split(/[a-z]/i).shift(),
                    ingredMeasurement = singleIngredient.measure.split(/[0-9]/g).pop().split(' ').pop();
            groceries.push({
                name:ingredName,
                amount:ingredAmount,
                measurement: ingredMeasurement
            })
            })
        });
        /*save prepared grocery list*/
       TODAY.groceries = arrayConvoluter(groceries);
        TODAY.save()
            .then(newDayplan=>{
                console.log('grocerielist added and saved')
            })
    }
    /**
     * Finally make an object to return as request result
     * each day collected all todos from it's recipes and have them put in two arrays
     * the todoY array has the actions for YESTERDAY's todos
     * the todoM array has the actions for TODAY's todos
     * So while constructing the Day object to be returned as a respinse
     * We take todosY FROM TOMMOROW, and todosM from TODAY*/
    ActualDay.findOne({dayplanID:TODAY._id},(err,foundActualDay)=>{
        if(!err){
            if(foundActualDay){
                console.log('there is an Actual Day - doing nothing');
            } else {
                console.log('there is no actual day - need to create one');
                let dayObject = Object.assign({},TODAY._doc);
                delete dayObject.todosY;
                Dayplan.findOne({date:addSomeDays(today,1)},async (err,tomorrowDay)=>{
                    if(!err){
                        let tommorowTodos = tomorrowDay.todosY,
                            todayTodos = dayObject.todosM,
                            allTodos = tommorowTodos.concat(todayTodos);
                        /*create Todos array fin needed format*/
                        const todosObjects = allTodos.map(todo=>{
                            return {
                                todo:todo,
                                active:true
                            }
                        });
                        /*populate Meals array with actual data from recipes, needed for Dashboard:
                        * recipe ID
                        * recipe name
                        * recipe image*/
                        const DAYMEALS = dayObject.meals;
                        const ACTUAL_MEALS_PROMISES = DAYMEALS.map( meal=>{
                            return Recipe.findOne({_id:meal.recipe}).exec()
                        });
                        const ACTUAL_MEALS = await Promise.all(ACTUAL_MEALS_PROMISES);
                        const ACTUAL_MEALS_DATA = ACTUAL_MEALS.map((meal)=>{
                            return({
                                recipeID:meal._id,
                                recipeName:meal.mealName,
                                recipeImage:meal.image,
                                recipeCooked:false,/*FALSE put by default, cause we R just creating our Actual Day.*/
                            })
                        });
                        /**==================== REFACTOR REMINDERS =============================== */
                        /*I'm still dragging this mock reminder array, so that i can use them in FrontEnd.
                        * Eventually they will be generated by backend, but for now I'll have them this way */
                        const REMINDERS = dayObject.reminders;
                        const REMINDERS_PROMISES = REMINDERS.map(reminderID=>{
                            return Reminder.findOne({_id:reminderID}).exec()
                        });
                        const REMINDERS_DATA = await Promise.all(REMINDERS_PROMISES);
                        const REMINDERS_FOR_DAY = REMINDERS_DATA.map(reminder=>{
                            return ({
                                active:reminder.active,
                                content:reminder.content,
                                time:reminder.time
                            })
                        });
                        /*Prepared ToDos, along with the day's info needed to be stored in a separate MonoDB collection
                        * so App can fetch them later that day
                        * So when user completes ToDos, cooks recipes, and so on - an App can keep info actual in Database*/
                        const ACTUAL_DAY={
                            dayplanID:dayObject._id,
                            reminders: REMINDERS_FOR_DAY,
                            meals: ACTUAL_MEALS_DATA,
                            todos:todosObjects,
                            date:dayObject.date,
                            groceryDay:dayObject.groceryDay,
                            groceries:dayObject.groceries
                        };
                         await new ActualDay (ACTUAL_DAY)
                             .save()
                             .then(ActualDay=>{
                                 console.log('new ActualDay created in dayCreator:\n',ActualDay)
                             })
                             .catch(err=>console.log('error creating ActualDay in DayCreator'))
                    }
                })
            }
        } else {
            console.log('error fetching actual day with ID: ',TODAY._id,'. Here what is wrong: \n',err)
        }
    })


};