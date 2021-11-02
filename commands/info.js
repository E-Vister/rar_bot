const fs = require("fs");
const loger = require('C:/Users/Bausiuk/Documents/Github/rar_bot/plugins/loger.js');

module.exports.run = (bot, msg) => {
    let formatedTime = loger.formatData(new Date())
    let logmsgage = `${formatedTime} - "${msg.author.username}" (${msg.author.id}) viewed text channel info -> "${msg.channel.name}"\n`;

    fs.appendFileSync('./log.txt', logmsgage);

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