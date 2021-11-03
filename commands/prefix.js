const prefix_manager = require(global.path + '/plugins/prefix_manager.js')

module.exports.run = async (bot, msg, args, database) => {
    if (!args[0]) return prefix_manager.view(bot, msg, [], database);
    prefix_manager.set(bot, msg, args, database);
}