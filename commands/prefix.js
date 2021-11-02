module.exports.run = (bot, msg, args, database) => {
    if (!args[0]) return;
    database.getGuildData(msg.guild).prefix = args[0];
    msg.channel.send(`New prefix for the commands: '${args[0]}'`);
}