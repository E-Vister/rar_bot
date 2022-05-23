const rolesManager = require(global.path + '/plugins/roles_manager.js');
const timeManager = require(global.path + '/plugins/time_manager.js');
const logger = require(global.path + '/plugins/logger.js');
const {MessageEmbed} = require("discord.js");

module.exports.run = async (bot, msg, args, database) => {
    let role = msg.guild.roles.cache.find(r => r.id === database.getGuildData(msg.guild).mutedRole.id);
    let [toMute, muteTime, ...muteReason] = args;

    if (!msg.member.hasPermission('ADMINISTRATOR')) return msg.reply("you don't have the permissions");

    toMute = await msg.mentions.members.first();

    if (Array.isArray(muteReason) && muteReason.length) {
        muteReason = muteReason.join(" ");
    } else {
        muteReason = 'no reason';
    }

    if (args.length < 2 || !toMute || !timeManager.ms(muteTime)) return msg.reply(`Enter a message like: ${database.getGuildData(msg.guild).prefix}mute <@${msg.author.id}> 1s/m/h/d`);

    if (!rolesManager.isMutedRoleDefined(msg, database)) {
        role = await rolesManager.createMutedRole(msg, database);
    }

    if (!role) return;

    if (!msg.member.roles.cache.has(role.id)) {

        if (toMute.id === msg.author.id) return msg.reply("can't mute yourself");

        if (toMute.hasPermission('ADMINISTRATOR')) return msg.reply("can't mute the administrator");

        await toMute.roles.add(role).catch(console.error);

        msg.reply(`<@${toMute.id}> has been muted for ${muteTime}`);

        await msg.guild.channels.create(`block-info ${toMute.id}`, {
            type: "text",
            permissionOverwrites: [
                {
                    id: msg.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES', 'READ_MESSAGE_HISTORY']
                },
                {
                    id: toMute.id,
                    allow: ['VIEW_CHANNEL', 'READ_MESSAGE_HISTORY'],
                    deny: ['SEND_MESSAGES']
                }
            ]
        }).then(channel => {
            const embed = new MessageEmbed()
                .setColor('#bd1515')
                .setTitle(`You have been muted`)
                .setAuthor(toMute.user.username, toMute.user.avatarURL())
                .addField(`Muted by`, `${msg.author.username}`)
                .addField(`Reason`, `${muteReason}`)
                .addField(`Unmute at`, `${timeManager.formatTime(+new Date() + timeManager.ms(muteTime))}`);

            channel.send(embed);

            let muteTimerId = setTimeout(() => {
                let unmuteLogMessage = `${toMute.user.username} has been unmuted`;

                toMute.roles.remove(role);
                msg.channel.send(`<@${toMute.id}> has been unmuted`);
                logger.log(unmuteLogMessage, {msg, database});
                channel.delete();
            }, timeManager.ms(muteTime));

            database.getGuildData(msg.guild).accounts[toMute.id] = muteTimerId;
        })
    }

    let muteLogMessage = `muted ${toMute.user.username} for a ${muteTime} with a reason ${muteReason}`;

    logger.log(muteLogMessage, {msg, database});
}

module.exports.about = (bot, msg, args, database) => {
    return `mute a specific user for a certain time
    ${database.getGuildData(msg.guild).prefix}mute <@usertag> 1s/m/h/d [reason/no reason]`;
}