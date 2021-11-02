const fs = require("fs");
const loger = require('C:/Users/Bausiuk/Documents/Github/rar_bot/plugins/loger.js');

module.exports.run = (bot, msg) => {
    let logMessage = `viewed text channel info -> "${msg.channel.name}"`;

    loger.log(logMessage, msg);

    msg.channel.send(`
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
Last msgage: ${msg.channel.lastmsgage}
Type: ${msg.channel.type}
===================
    `);
}