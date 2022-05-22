module.exports.createMutedRole = async (msg, database) => {
    return msg.guild.roles.create({
        data: {
            name: 'Muted',
            color: 'BLUE',
            permissions: [],
        },
        reason: 'guild have no muted role',
    }).then((role) => {
        let rolesId = Array.from(msg.guild.roles.cache.keys());

        msg.guild.channels.cache.forEach(async (channel, id) => {
            await channel.updateOverwrite(role, {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SPEAK: false,
            })
        });

        if (rolesId[rolesId.length - 1] === role.id) {
            database.getGuildData(msg.guild).mutedRole.id = rolesId[rolesId.length - 1];
            return role;
        }

        if (rolesId.length > 1 && (rolesId[rolesId.length - 2] === role.id)) {
            database.getGuildData(msg.guild).mutedRole.id = rolesId[rolesId.length - 2];
            return role;
        }

        return role;
    });
}

module.exports.isMutedRoleDefined = (msg, database) => {
    return !!msg.guild.roles.cache.find(r => r.id === database.getGuildData(msg.guild).mutedRole.id);
}