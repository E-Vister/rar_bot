const rolesManager = require(global.path + '/plugins/roles_manager.js');

module.exports.run = async (bot, msg, args, database) => {
    let role = msg.guild.roles.cache.find(r => r.id === database.getGuildData(msg.guild).mutedRole.id);

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply("you don't have the permissions");

    if (args.length !== 1) return msg.reply(`Enter a message like: ${database.getGuildData(msg.guild).prefix}role @${msg.author.tag}`);

    if (!rolesManager.isMutedRoleDefined(msg, database)) {
        role = await rolesManager.createMutedRole(msg, database);
    }

    if (!role) return;

    if (!msg.member.roles.cache.has(role.id)) {
        let member = msg.mentions.members.first();

        if (member.id === msg.author.id) return msg.reply("can't mute yourself");

        if (member.hasPermission('ADMINISTRATOR')) return msg.reply("can't mute the administrator");

        member.roles.add(role).catch(console.error);
    }
}

module.exports.about = (bot, msg, args, database) => {
    return `mute a specific user
    ${database.getGuildData(msg.guild).prefix}mute <usertag>`;
}