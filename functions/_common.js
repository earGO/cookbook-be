export const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const addSomeDays = (date,days) => {
    const oldDays = date.getDate(),
        workDate = new Date(date);
    let res = new Date(workDate.setDate(oldDays+days));
    return res;
};

export const arrayConvoluter = (array) =>{
    let retArray = [];
    const suckOne = (arr) =>{
        let result = arr.shift();
        arr.forEach((item,key)=>{
            if(item.name===result.name){
                result.amount = (parseInt(result.amount)+parseInt(item.amount)).toString()
                arr.splice(key,1)
            }
        })
        return result;
    };
    while (array.length){
        retArray.push(suckOne(array))
    }
    return retArray
};

export const objectClone = (obj) => {
    var copy;

    // Handle the 3 simple types, and null or undefined
    if (null == obj || "object" != typeof obj) return obj;

    // Handle Date
    if (obj instanceof Date) {
        copy = new Date();
        copy.setTime(obj.getTime());
        return copy;
    }

    // Handle Array
    if (obj instanceof Array) {
        copy = [];
        for (var i = 0, len = obj.length; i < len; i++) {
            copy[i] = objectClone(obj[i]);
        }
        return copy;
    }

    // Handle Object
    if (obj instanceof Object) {
        copy = {};
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = objectClone(obj[attr]);
        }
        return copy;
    }

    throw new Error("Unable to copy obj! Its type isn't supported.");
};
