const channelManager = require(global.path + '/plugins/channel_manager.js');

module.exports.run = async (bot, msg, args, database) => {
    //Not admin
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('you don\'t have the permissions');

    //Cannot turn off logging in the service channels
    if(msg.channel.name === 'server-logs') return;

    let channel = channelManager.getChannel(msg, 'server-logs');

    //Deleting service channel
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