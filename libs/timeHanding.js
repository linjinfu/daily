export default {
    getTime() {
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        today.setMilliseconds(0);
        return today.getTime()
    },
    getDate(time){
        const today = new Date(time);
        let year = today.getFullYear();
        let month = today.getMonth()+1<10 ? 0 + (today.getMonth()+1)  : today.getMonth()+1;
        let day = today.getDate()<10 ? '0' + today.getDate() : today.getDate();
        return  `${year}${month}${day}`
    }
}