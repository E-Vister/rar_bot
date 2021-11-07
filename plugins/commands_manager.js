const fs = require("fs");

module.exports.get = (path = './commands') => {
    path = path.slice(2);
    const files = fs.readdirSync(path).filter(f => f.endsWith('.js'));
    const commands = {};

    files.forEach(file => {
        const cname = file.toLowerCase().substring(0, file.length - 3);
        commands[cname] = require(global.path + '\\' + path + '\\' + file);
    });

    return commands
}