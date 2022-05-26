const channelManager = require(global.path + '/plugins/channel_manager.js');

module.exports.run = async (bot, msg, args, database) => {
    //Not admin
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply('you don\'t have the permissions');

    let channel = channelManager.getChannel(msg, "server-logs");

    //Creating service channel
    if (!channel) {
        msg.guild.channels.create("server-logs", {
            type: "text",
            permissionOverwrites: [
                {
                    id: msg.guild.roles.everyone,
                    allow: ['READ_MESSAGE_HISTORY'],
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                }
            ],
        });

        database.getGuildData(msg.guild).logging = true;
        msg.reply("Logging is enabled!");
    }
}

module.exports.about = (bot, msg, args, database) => {
    return `enables logging on the server
    ${database.getGuildData(msg.guild).prefix}logon`;
}