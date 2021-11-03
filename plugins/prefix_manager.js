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
    let prefix = database.getGuildData(msg.guild).prefix;
    let logMessage = `change prefix '${prefix}' -> '${args[0]}'`;

    database.getGuildData(msg.guild).prefix = args[0];
    msg.reply(`New prefix for the commands: '${args[0]}'`);

    logger.log(logMessage, {msg, database});
}
