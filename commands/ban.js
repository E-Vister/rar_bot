const logger = require(global.path + '/plugins/logger.js');

module.exports.run = async (bot, msg, args, database) => {
    let [toBan, ...banReason] = args;

    //Not admin
    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply("you don't have the permissions");

    toBan = await msg.mentions.members.first();

    if (Array.isArray(banReason) && banReason.length) {
        banReason = banReason.join(" ");
    } else {
        banReason = 'no reason';
    }

    //Not enough values and banned user not exists
    if (args.length < 1 || !toBan) return msg.reply(`Enter a message like: ${database.getGuildData(msg.guild).prefix}ban <@${msg.author.id}>`);

    //Cannot ban yourself
    if (toBan.id === msg.author.id) return msg.reply("can't ban yourself");

    //Banned user is admin
    if (toBan.hasPermission('ADMINISTRATOR')) return msg.reply("can't ban the administrator");

    msg.guild.members.ban(toBan, {
        reason: banReason
    });

    msg.reply(`<@${toBan.id}> has been banned with a reason: ${banReason}`);

    let kickLogMessage = `banned ${toBan.user.username} with a reason: ${banReason}`;

    logger.log(kickLogMessage, {msg, database});
}

module.exports.about = (bot, msg, args, database) => {
    return `ban a specific user
    ${database.getGuildData(msg.guild).prefix}ban <@usertag>`;
}