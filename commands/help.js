const {MessageEmbed} = require("discord.js");
const commands_manager = require(global.path + '/plugins/commands_manager.js');
const commands = commands_manager.get();

module.exports.run = async (bot, msg, args, database) => {

    let embed = new MessageEmbed()
        .setColor('#0099ff')
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle('Commands List');

    for (let commandName of Object.keys(commands)){
        embed.addField(commandName.toString(), commands[commandName].about(bot, msg, args, database));
    }

    await msg.channel.send(embed);
}

module.exports.about = (bot, msg, args, database) => {
    return `showing info about bot commands
    ${database.getGuildData(msg.guild).prefix}help`;
}