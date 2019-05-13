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