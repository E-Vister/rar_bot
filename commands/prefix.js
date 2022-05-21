const prefix_manager = require(global.path + '/plugins/prefix_manager.js')

module.exports.run = async (bot, msg, args, database) => {
    if (!(msg.guild.ownerID === msg.author.id)) return prefix_manager.view(bot, msg, [], database);

    if (!args[0]) return prefix_manager.view(bot, msg, [], database);
    prefix_manager.set(bot, msg, args, database);
}

module.exports.about = (bot, msg, args, database) => {
    return `showing current prefix and changes it 
    ${database.getGuildData(msg.guild).prefix}prefix <new-prefix>`;
}