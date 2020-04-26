export const FormatDateFromString = (data) => {
    let holder = new Date(data.toString());
    return FormatDayKeyToDayName(holder.getDay()) + " " + holder.getDate() + " " + FormatMonthKeyToMonthName(holder.getMonth()) + ", " + holder.getFullYear(); 
}

export const FormatDayKeyToDayName = (key, type = 'full') => {
    const dayNameMini = [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Say"
    ];

    const dayName = [
        "Sunday",
        "Monday",
        "Tueday",
        "Wedday",
        "Thuday",
        "Friday",
        "Sayday"
    ];

    switch(type){
        case 'mini':
            return dayNameMini[key];
        default:
            return dayName[key];
    }
} 

export const FormatMonthKeyToMonthName = (key, type = 'full') => {
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

    const monthNamesMini = [
        "Jan", 
        "Feb", 
        "Mar", 
        "Apr", 
        "May", 
        "Jun",
        "Jul", 
        "Aug", 
        "Sep", 
        "Oct", 
        "Nov", 
        "Dec"
    ];

    switch(type){
        case 'mini':
            return monthNamesMini[key];
        default:
            return monthNames[key];
    }
} 

export const FormatToMiniDate = (data) => {
    let holder = new Date(data.toString());
    return FormatMonthKeyToMonthName(holder.getMonth(), 'mini') + " " + holder.getDate();
}