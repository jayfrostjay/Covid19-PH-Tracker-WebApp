export const FormatDateFromString = (data) => {
    let holder = new Date(data.toString());
    let dayName = FormatDayKeyToDayName(holder.getDay());
    return dayName + " " + holder.getDate() + " " + holder.getMonth() + ", " + holder.getFullYear(); 
}

export const FormatDayKeyToDayName = (key) => {
    let weekday = new Array(7);
    weekday[0] = "Sun";
    weekday[1] = "Mon";
    weekday[2] = "Tue";
    weekday[3] = "Wed";
    weekday[4] = "Thu";
    weekday[5] = "Fri";
    weekday[6] = "Sat";
    return weekday[key];
} 