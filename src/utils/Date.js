export const FormatDateFromString = (data) => {
    let holder = new Date(data.toString());
    return FormatDayKeyToDayName(holder.getDay()) + " " + holder.getDate() + " " + FormatMonthKeyToMonthName(holder.getMonth()) + ", " + holder.getFullYear(); 
}

export const FormatDayKeyToDayName = (key) => {
    const dayName = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Say"
    ];
    return dayName[key];
} 

export const FormatMonthKeyToMonthName = (key) => {
    const monthNames = [
        "January", 
        "February", 
        "March", 
        "April", 
        "May", 
        "June",
        "July", 
        "August", 
        "September", 
        "October", 
        "November", 
        "December"
    ];
    return monthNames[key];
} 