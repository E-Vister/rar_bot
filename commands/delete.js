const fs = require('fs');
const loger = require('C:/Users/Bausiuk/Documents/Github/rar_bot/plugins/loger.js');

module.exports.run = (bot, msg, args, database) => {
    let prefix = database.getGuildData(msg.guild).prefix;

    if (args[0] === 'general') {
        msg.reply('You cannot delete the general channel!');
        return;
    }

    if (args[0]){
        let logMessage = `deleted text channel -> "${args[0]}"`;

        const { guild } = msg;
        const channel = guild.channels.cache
            .filter((channel) => {
                return channel.name === args[0];
            })
            .first();

        if (!channel) {
            msg.reply('That channel does not exist.')
            return
        }

        channel.delete();

        loger.log(logMessage, msg);
    }
    else {
        msg.channel.send(`Enter "${prefix}delete ${msg.channel.name}" to delete this channel`);
    }
}