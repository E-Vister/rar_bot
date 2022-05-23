const logger = require(global.path + '/plugins/logger.js');

module.exports.run = async (bot, msg, args, database) => {
    let [toKick, ...kickReason] = args;

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply("you don't have the permissions");

    toKick = await msg.mentions.members.first();

    if (Array.isArray(kickReason) && kickReason.length) {
        kickReason = kickReason.join(" ");
    } else {
        kickReason = 'no reason';
    }

    if (args.length < 1 || !toKick) return msg.reply(`Enter a message like: ${database.getGuildData(msg.guild).prefix}kick <@${msg.author.id}>`);

    if (toKick.id === msg.author.id) return msg.reply("can't kick yourself");

    if (toKick.hasPermission('ADMINISTRATOR')) return msg.reply("can't kick the administrator");

    toKick.kick(kickReason);

    msg.reply(`<@${toKick.id}> has been kicked with a reason: ${kickReason}`);

    let kickLogMessage = `kick ${toKick.user.username} with a reason: ${kickReason}`;

    logger.log(kickLogMessage, {msg, database});
}

module.exports.about = (bot, msg, args, database) => {
    return `kick a specific user
    ${database.getGuildData(msg.guild).prefix}kick <@usertag>`;
}