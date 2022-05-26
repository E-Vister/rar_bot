const logger = require("./logger");

module.exports.view = async (bot, msg, args, database) => {
    return msg.reply(`Current prefix: ${database.getGuildData(msg.guild).prefix}`);
}

module.exports.setDefault = async (bot, msg, args, database) => {
    let logMessage = 'set prefix to default';

    logger.log(logMessage, {msg, database});
    msg.reply("Prefix has been reset!");

    return database.getGuildData(msg.guild).prefix = "-";
}

module.exports.set = async (bot, msg, args, database) => {
    let newPrefix = args[0];
    let logMessage = `change prefix '${database.getGuildData(msg.guild).prefix}' -> '${newPrefix}'`;

    database.getGuildData(msg.guild).prefix = newPrefix;
    msg.reply(`New prefix for the commands: '${newPrefix}'`);

    logger.log(logMessage, {msg, database});
}
