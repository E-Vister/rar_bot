const fs = require("fs");

function checkZero(value){
    return (value < 10)?('0' + value):(value)
}

function formatData(data){
    return `${checkZero(data.getDate())}.${checkZero(data.getMonth())}.${data.getFullYear()} ` +
        `${checkZero(data.getHours())}:${checkZero(data.getMinutes())}:${checkZero(data.getSeconds())}`;
}

module.exports.log = (logMessage, msg) => {
    let formatedTime = formatData(new Date());
    fs.appendFileSync('./log.txt', `${formatedTime} - "${msg.guild}" - "${msg.author.username}" (${msg.author.id}) ` + logMessage + "\n");
}

module.exports.logError = (logMesage) => {
    let formatedTime = formatData(new Date());
    fs.appendFileSync('./log.txt', `${formatedTime} - ` + logMesage);
}