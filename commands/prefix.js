const loger = require('C:/Users/Bausiuk/Documents/Github/rar_bot/plugins/loger.js');
const fs = require("fs");

module.exports.run = (bot, msg, args, database) => {
    let prefix = database.getGuildData(msg.guild).prefix;
    let logMessage = `change prefix '${prefix}' -> '${args[0]}'`;

    if (!args[0]) return msg.reply(`Current prefix: ${database.getGuildData(msg.guild).prefix}`);

    loger.log(logMessage, msg);
    database.getGuildData(msg.guild).prefix = args[0];
    msg.channel.send(`New prefix for the commands: '${args[0]}'`);
}