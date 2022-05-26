const logger = require(global.path + '/plugins/logger.js');
const rolesManager = require(global.path + '/plugins/roles_manager.js');

module.exports.run = async (bot, msg, args, database) => {
    let type,
        channelName,
        logMessage;

    //Not admin
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('you don\'t have the permissions');

    //Don't have enough arguments
    if (args.length < 2) return msg.reply(`Enter a message like: ${database.getGuildData(msg.guild).prefix}create <name> [text/voice]`);

    type = args.pop();

    if (type !== 'text' && type !== 'voice') return;

    channelName = args.reduce((previousValue, item) => previousValue + "-" + item);

    //Channel name too short/long
    if (channelName.length > 100 && channelName.length < 1) return msg.reply("Channel's name must be between 1 and 100 in length!");

    logMessage = `created a new ${type} channel -> "${channelName}"`

    //Creating 'Muted' role if it doesn't exist
    if (!rolesManager.isMutedRoleDefined(msg, database)) {
        await rolesManager.createMutedRole(msg, database);
    }

    msg.guild.channels.create(channelName, {
        type: type,
        permissionOverwrites: [
            {
                id: msg.guild.roles.everyone,
                allow: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
            },
            {
                id: database.getGuildData(msg.guild).mutedRole.id,
                deny: ['SEND_MESSAGES', 'SPEAK']
            }
        ],
    })
    logger.log(logMessage, {msg, database});
}

module.exports.about = (bot, msg, args, database) => {
    return `creating new channel
    ${database.getGuildData(msg.guild).prefix}create <name> [text/voice]`;
}