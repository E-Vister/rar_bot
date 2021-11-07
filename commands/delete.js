const logger = require(global.path + '/plugins/logger.js');
const channelManager = require(global.path + '/plugins/channel_manager.js');

module.exports.run = async (bot, msg, args, database) => {
    let prefix = database.getGuildData(msg.guild).prefix;

    if (args[0] === 'general' || args[0] === 'server-logs') {
        msg.reply('You cannot delete that channel!');
        return;
    }

    if (args[0]){
        let logMessage = `deleted text channel -> "${args[0]}"`;

        let channel = channelManager.checkName(msg, args);

        if (!channel) {
            msg.reply('That channel does not exist.')
            return
        }

        channel.delete();

        logger.log(logMessage, {msg, database});
    }
    else {
        msg.channel.send(`Enter "${prefix}delete ${msg.channel.name}" to delete this channel`);
    }
}

module.exports.about = (bot, msg, args, database) => {
    return `deleting specified or current channel
    ${database.getGuildData(msg.guild).prefix}delete <name>`;
}