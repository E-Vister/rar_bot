const logger = require(global.path + '/plugins/logger.js');
const channelManager = require(global.path + '/plugins/channel_manager.js');

module.exports.run = async (bot, msg, args, database) => {
    let channelToDelete;

    //Not admin
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('you don\'t have the permissions');

    //Don't have enough arguments
    if (args.length < 1) return msg.reply(`Enter "${database.getGuildData(msg.guild).prefix}delete ${msg.channel.name}" to delete this channel`);

    channelToDelete = channelManager.getChannel(msg, args)

    //Cannot delete service channels
    if (channelToDelete.name === 'general' || channelToDelete.name === 'server-logs') {
        msg.reply('You cannot delete that channel!');
        return;
    }

    //Channel doesn't exist
    if (!channelToDelete) {
        msg.reply('That channel does not exist.')
        return
    }

    let logMessage = `deleted text channel -> "${channelToDelete}"`;

    channelToDelete = channelManager.getChannel(msg, args);

    channelToDelete.delete();

    logger.log(logMessage, {msg, database});

}

module.exports.about = (bot, msg, args, database) => {
    return `deleting specified or current channel
    ${database.getGuildData(msg.guild).prefix}delete <name>`;
}