const fs = require("fs");
const channelManager = require(global.path + '/plugins/channel_manager.js');
const timeManager = require(global.path + '/plugins/time_manager.js');
const {MessageEmbed} = require("discord.js");

module.exports.log = async (logMessage, eventData) => {
    let formatedTime = timeManager.formatTime();
    const channel = channelManager.checkName(eventData.msg, "server-logs");
    const logData = `${formatedTime} - "${eventData.msg.guild}" - "${eventData.msg.author.username}" (${eventData.msg.author.id}) ` + logMessage;

    fs.appendFileSync('./log.txt', logData + "\n");

    if(channel && eventData.database.getGuildData(eventData.msg.guild).logging) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(formatedTime)
            .setAuthor(eventData.msg.author.username, eventData.msg.author.avatarURL())
            .setDescription(logMessage);

        channel.send(embed);
    }
}