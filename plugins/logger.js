const fs = require("fs");
const channelManager = require(global.path + '/plugins/channel_manager.js');
const {MessageEmbed} = require("discord.js");

function checkZero(value){
    return (value < 10)?('0' + value):(value)
}

function formatTime(data){
    return `${checkZero(data.getDate())}.${checkZero(data.getMonth())}.${data.getFullYear()} ` +
        `${checkZero(data.getHours())}:${checkZero(data.getMinutes())}:${checkZero(data.getSeconds())}`;
}

module.exports.log = async (logMessage, data) => {
    let formatedTime = formatTime(new Date());
    const channel = channelManager.checkName(data.msg, "server-logs");
    const logData = `${formatedTime} - "${data.msg.guild}" - "${data.msg.author.username}" (${data.msg.author.id}) ` + logMessage;

    fs.appendFileSync('./log.txt', logData + "\n");

    if(channel && data.database.getGuildData(data.msg.guild).logging) {
        const embed = new MessageEmbed()
            .setColor('#0099ff')
            .setTitle(formatedTime)
            .setAuthor(data.msg.author.username, data.msg.author.avatarURL())
            .setDescription(logMessage);

        channel.send(embed);
    }
}