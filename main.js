global.path = __dirname;

const Discord = require('discord.js');
const fs = require('fs');
const database = require('./database');
const prefix_manager = require('./plugins/prefix_manager');
const command_manager = require('./plugins/commands_manager');

const bot = new Discord.Client();

let commands = {};
let databaseLoad = false;

// When bot is loaded
bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    console.log('https://discord.com/api/oauth2/authorize?client_id=977541756436508732&permissions=8&scope=bot\n');

    database.load('./database.json');
    databaseLoad = true;
    loadCommands('./commands');
});

// React on the messages
bot.on('message', (msg) => {
    let prefix = database.getGuildData(msg.guild).prefix;

    //Message author is bot
    if (msg.author.bot) return;

    //Default commands
    if (msg.content.toLowerCase() === 'bot prefix') prefix_manager.view(bot, msg, [], database);
    if (msg.content.toLowerCase() === 'set default prefix') prefix_manager.setDefault(bot, msg, [], database);

    //Message have no prefix
    if (!msg.content.startsWith(prefix)) return;

    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    for (let cname in commands) {
        if (command.startsWith(cname)) {
            commands[cname].run(bot, msg, args, database);
        }
    }
});

//When bot is closing
process.on("SIGINT", () => {
    console.log('closing...');
    bot.destroy();
    if (databaseLoad) database.save('./database.json');
});

//Token load
fs.readFile('./token.txt', (err, data) => {
    if (err) {
        console.error(err);
        process.exit();
    }

    let token = data.toString();
    bot.login(token);
});

function loadCommands(path) {
    console.log('Loading commands...');

    commands = command_manager.get(path);

    for (let key of Object.keys(commands)) {
        console.log(`* ${key} loaded`);
    }

    console.log("All commands successfully loaded!");
}