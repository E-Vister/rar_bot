const database = require("C:/Users/Bausiuk/Documents/Github/rar_bot/database.js");
const loger = require("./loger");

module.exports.view = (bot, msg, args, database) => {
    return msg.reply(`Current prefix: ${database.getGuildData(msg.guild).prefix}`);
}

module.exports.setDefault = (bot, msg, args, database) => {
    let logMessage = 'set prefix to default';

    loger.log(logMessage, msg);
    msg.reply("Prefix has been reset!");

    return database.getGuildData(msg.guild).prefix = "-";
}
