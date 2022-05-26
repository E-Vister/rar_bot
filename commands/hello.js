module.exports.run = async (bot, msg) => {
    msg.reply("hello!");
}

module.exports.about = (bot, msg, args, database) => {
    return `bot greeting you
    ${database.getGuildData(msg.guild).prefix}hello`;
}

