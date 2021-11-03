const logger = require(global.path + '/plugins/logger.js');

module.exports.run = async (bot, msg, args, database) => {
    let logMessage = `viewed text channel info -> "${msg.channel.name}"`;

    await msg.channel.send(`
======Channel=======
Id: ${msg.channel.id}
Client: ${msg.channel.client}
Created at: ${msg.channel.createdAt}
===================
    
====ServerChannel=====
Name: ${msg.channel.name}
Type: ${msg.channel.type}
Position: ${msg.channel.position}
PermissionOverwrites: ${msg.channel.permissionOverwrites}
===================

=====TextChannel=====
Topic: ${msg.channel.topic}
Last message: ${msg.channel.lastMessage}
Type: ${msg.channel.type}
===================
    `);

    logger.log(logMessage, {msg, database});
}