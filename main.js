const Discord = require('discord.js');
const config = require('./config.json');
const fs = require('fs');

const bot = new Discord.Client();
const prefix = config.prefix;
const commands = {};

bot.on('ready', () => {
    console.log(`Logged in as ${bot.user.tag}!`);
    console.log('https://discord.com/oauth2/authorize?client_id=904970118105280542&permissions=8&scope=bot');
    loadCommands('./commands');
});


bot.on('message', (msg) => { // React on the messages
    if(msg.author.bot) return;
    if(!msg.content.startsWith(prefix)) return;

    const commandBody = msg.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();
    const database = {};

    for (let cname in commands){
        if (command.startsWith(cname)){
            commands[cname].run(bot, msg, args, database);
        }
    }
});

fs.readFile('./token.txt', (err, data) => {
    if(err){
        console.error(err);
        process.exit();
    }
    let token = data.toString();
    bot.login(token);
});

function loadCommands(path) {
    console.log('Loading commands...');
    const files = fs.readdirSync(path).filter(f => f.endsWith('.js'));
    files.forEach(file => {
        const cname = file.toLowerCase().substring(0, file.length - 3);
        commands[cname] = require(path + '/' + file);
        console.log(`* ${file} loaded`);
    });
    console.log("All commands successfully loaded!");
}

//https://oauth.vk.com/blank.html#access_token=beb3e1f4a9ff137f9cdf7b466239bb69da141b4605f84a70eed8433d47fa32d47271947ae17542b375614&expires_in=0&user_id=678818215
//user_id=678818215
//access_token=beb3e1f4a9ff137f9cdf7b466239bb69da141b4605f84a70eed8433d47fa32d47271947ae17542b375614