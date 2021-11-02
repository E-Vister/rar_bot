const fs = require('fs');
const loger = require('C:/Users/Bausiuk/Documents/Github/rar_bot/plugins/loger.js');

module.exports.run = (bot, msg, args, database) => {
    let prefix = database.getGuildData(msg.guild).prefix;

    if (msg.channel.name === 'general') {
        msg.channel.send('You cannot delete the general channel!');
        return;
    }

    if (args[0] === msg.channel.name){
        let formatedTime = loger.formatData(new Date())
        let logmsgage = `${formatedTime} - "${msg.author.username}" (${msg.author.id}) deleted text channel -> "${msg.channel.name}"\n`;

        fs.appendFileSync('./log.txt', logmsgage);

        msg.channel.delete();
    }
    else {
        msg.channel.send(`Enter "${prefix}delete ${msg.channel.name}" to delete this channel`);
    }
}