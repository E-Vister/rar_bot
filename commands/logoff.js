const channelManager = require(global.path + '/plugins/channel_manager.js');

module.exports.run = async (bot, msg, args, database) => {
    if(msg.channel.name === 'server-logs') return;

    let channel = channelManager.checkName(msg, 'server-logs');

    if (channel) {
        channel.delete();
        database.getGuildData(msg.guild).logging = false;
        msg.reply("Logging is disabled!");
    }
}

module.exports.about = (bot, msg, args, database) => {
    return `disables logging on the server
    ${database.getGuildData(msg.guild).prefix}logoff`;
}