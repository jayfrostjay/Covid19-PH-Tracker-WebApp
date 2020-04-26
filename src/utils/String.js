export const StringIsEmpty = (string) => {
    return (String.prototype.trim.call(string) === "");
}

export const StringToInt = (string) => {
    return parseInt(string.replace(',', ''));
}