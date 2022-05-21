module.exports.run = async (bot, msg) => {
    msg.channel.send('pong')
}

module.exports.about = (bot, msg, args, database) => {
    return `checking the bot's response
    ${database.getGuildData(msg.guild).prefix}ping`;
}