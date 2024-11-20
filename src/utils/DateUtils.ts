export function dateToString(date: Date) : string {
    console.log(date);
    
    if(date){
        return date.toLocaleString('default', { timeZone: "UTC", day: "numeric", month: 'long', year: "numeric" })
    }
    return "";
}