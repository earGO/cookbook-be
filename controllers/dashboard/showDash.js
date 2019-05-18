import {dayCreator} from '../../functions/dayCreator';

const ActualDay = require('../../models/ActualDay');

//contorollers functions
const
    showDash = async (req, res,next) => {
        console.log(typeof req.params.date);
        const TODAY = new Date(parseInt(req.params.date));
        console.log(TODAY)
        await dayCreator(TODAY);
        ActualDay.findOne({date:TODAY},(err,foundActualDay)=>{
            if(!err){
                if(foundActualDay){
                    console.log('this is day we found:\n',foundActualDay._id)
                    res.send(foundActualDay);
                } else {
                    res.send('error in fetching actual day - there is none')
                }

            } else {
                res.send(err)
            }
        })
};


module.exports = {
    showDash
}