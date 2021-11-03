const channelManager = require(global.path + '/plugins/channel_manager.js');

module.exports.run = async (bot, msg, args, database) => {
    let channel = channelManager.checkName(msg, "server-logs");

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