const logger = require(global.path + '/plugins/logger.js');

module.exports.run = async (bot, msg, args, database) => {
    let toUnmute,
        accounts,
        role,
        channel;

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply("you don't have the permissions");

    toUnmute = await msg.mentions.members.first();

    if (args.length !== 1 || !toUnmute) return msg.reply(`Enter a message like: ${database.getGuildData(msg.guild).prefix}unmute <@${msg.author.id}>`);

    accounts = database.getGuildData(msg.guild).accounts

    for (account in accounts) {
        if (account === toUnmute.id) {
            if (!accounts[account]) return;
            let unmuteLogMessage = `${toUnmute.user.username} has been unmuted`;

            role = await msg.guild.roles.cache.find(r => r.id === database.getGuildData(msg.guild).mutedRole.id);
            channel = await msg.guild.channels.cache.find(c => c.name === `block-info-${toUnmute.id}`);

            await toUnmute.roles.remove(role);
            msg.channel.send(`<@${toUnmute.id}> has been unmuted`);
            logger.log(unmuteLogMessage, {msg, database});
            channel.delete();

            clearTimeout(accounts[account]);
            accounts[account] = null;
        }
    }
}

module.exports.about = (bot, msg, args, database) => {
    return `unmute a specific user
    ${database.getGuildData(msg.guild).prefix}unmute <@usertag>`;
}