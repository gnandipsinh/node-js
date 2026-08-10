

const date = require("date-and-time");

const now = new Date();


console.log(date.format(now, "DD-MM-YYYY"));


console.log(date.format(now, "YYYY/MM/DD"));


console.log(date.format(now, "hh:mm:ss"));