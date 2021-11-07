const logger = require(global.path + '/plugins/logger.js');

module.exports.run = async (bot, msg, args, database) => {
    if (args.length < 2) return msg.reply(`Enter a message like: ${database.getGuildData(msg.guild).prefix}create [channel name] [channel type]`);
    let type = args.pop();
    if (type !== 'text' && type !== 'voice') return;
    let channelName = args.reduce((previousValue, item) => previousValue + "-" + item);
    if (channelName.length > 100 && channelName.length < 1) return msg.reply("Channel's name must be between 1 and 100 in length!");

    let logMessage = `created a new ${type} channel -> "${channelName}"`

    msg.guild.channels.create(channelName, {
        type: type,
        permissionOverwrites: [
            {
                id: msg.guild.roles.everyone,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            }
        ],
    })
    logger.log(logMessage, {msg, database});
}

module.exports.about = (bot, msg, args, database) => {
    return `creating new channel
    ${database.getGuildData(msg.guild).prefix}create <name> [text/voice]`;
}