module.exports.run = async (bot, msg, args, database) => {
    let role = msg.guild.roles.cache.find(r => r.id === database.getGuildData(msg.guild).mutedRoleId);

    if (args.length !== 1) return msg.reply(`Enter a message like: ${database.getGuildData(msg.guild).prefix}role @${msg.author.tag}`);

    if (!role || role.name !== 'Muted') {
        role = await createMutedRole(msg, database);
    }

    if (!role) return;

    if (!msg.member.roles.cache.has(role.id)) {
        let member = msg.mentions.members.first();
        member.roles.add(role).catch(console.error);
    }
}

module.exports.about = (bot, msg, args, database) => {
    return `What's this command doing now? Nothing :)
    ${database.getGuildData(msg.guild).prefix}role`;
}

async function createMutedRole(msg, database) {
    msg.guild.roles.create({
        data: {
            name: 'Muted',
            color: 'GRAY',
        },
        reason: 'guild haven no muted role',
    }).then(() => {
        if (msg.guild.roles.cache.find(r => r.name === "Muted")) {
            database.getGuildData(msg.guild).mutedRoleId = msg.guild.roles.cache.lastKey();
        }
    });

    return database.getGuildData(msg.guild).mutedRoleId;
}