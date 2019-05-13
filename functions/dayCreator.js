import {getRandomInt,addSomeDays} from "./_common";

const
    Dayplan = require('../models/Dayplans');

/*THIS MODULE CREATES A CURRENT DAY DATA
* and then sends it as a response to frontend*/

/*create an initial date for a dayplan fetching*/
const today = new Date();
today.setHours(0,0,0,0);

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

const dayCreator = async function() {
    Dayplan.find({date:today},async (err,foundDay)=>{
        console.log(foundDay)
    })
    console.log(addSomeDays(today,4))
}

module.exports={
    dayCreator};