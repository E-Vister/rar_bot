const database = require("C:/Users/Bausiuk/Documents/Github/rar_bot/database.js");
const loger = require("./loger");

module.exports.view = (bot, msg, args, database) => {
    return msg.channel.send(`Current prefix: ${database.getGuildData(msg.guild).prefix}`);
}

module.exports.setDefault = (bot, msg, args, database) => {
    let logMessage = 'set prefix to default';

    loger.log(logMessage, msg);
    msg.channel.send("Prefix has been reset!");

    return database.getGuildData(msg.guild).prefix = "-";
}
