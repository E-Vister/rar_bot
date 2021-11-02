module.exports.run = (bot, mess) => {
    mess.channel.send(`
======Channel=======
Id: ${mess.channel.id}
Client: ${mess.channel.client}
Created at: ${mess.channel.createdAt}
===================
    
====ServerChannel=====
Name: ${mess.channel.name}
Type: ${mess.channel.type}
Position: ${mess.channel.position}
PermissionOverwrites: ${mess.channel.permissionOverwrites}
===================

=====TextChannel=====
Topic: ${mess.channel.topic}
Last Message: ${mess.channel.lastMessage}
Type: ${mess.channel.type}
===================
    `);
}