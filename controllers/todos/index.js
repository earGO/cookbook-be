
const ActualDay = require('../../models/ActualDay');

import {dayCreator} from '../../functions/dayCreator';


//contorollers functions
const
    showAllToday = async (req, res, next) => {
        console.log(typeof req.params.date);
        const TODAY = new Date(parseInt(req.params.date));
        console.log('date in shoWallToday controller for todos looks lie: ',TODAY)
        await dayCreator(TODAY);
        ActualDay.findOne({date:TODAY},(err,foundActualDay)=>{
            if(!err){
                if(foundActualDay){
                    console.log('this is todos for the day we found:\n',foundActualDay.todos);
                    res.send(foundActualDay.todos);
                } else {
                    res.send('error in fetching actual day - there is none')
                }

            } else {
                res.send(err)
            }
        })
    };


module.exports = {
    showAllToday
}