const fs = require('fs');
const config = require('C:/Users/Bausiuk/Desktop/Projects/RaR Bot/json/config.json');
const prefix = config.prefix;

function checkZero(value){
    return (value < 10)?('0' + value):(value)
}

function formatData(data){
    return `${checkZero(data.getDate())}.${checkZero(data.getMonth())}.${data.getFullYear()} ` +
        `${checkZero(data.getHours())}:${checkZero(data.getMinutes())}:${checkZero(data.getSeconds())}`;
}

module.exports.run = (bot, mess, args) => {
    if (mess.channel.name === 'general') {
        mess.channel.send('You cannot delete the general channel!');
        return;
    }

    if (args[0] === mess.channel.name){
        let formatedTime = formatData(new Date())
        let logMessage = `${formatedTime} - "${mess.author.username}" (${mess.author.id}) deleted text channel -> "${mess.channel.name}"\n`;

        fs.appendFileSync('./log.txt', logMessage);

        mess.channel.delete();
    }
    else {
        mess.channel.send(`Enter "${prefix}delete ${mess.channel.name}" to delete this channel`);
    }
}