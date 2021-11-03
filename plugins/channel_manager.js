module.exports.checkName = (msg, args) => {
    if (typeof args != "object") args = args.split(" ");
    const { guild } = msg;
    return guild.channels.cache
        .filter((channel) => {
            return channel.name === args[0];
        })
        .first();
}