const fs = require('fs');

let guilds = {};

const load = (path) => {
    console.log('Attempt to load database...');
    let data = { guilds: {} };
    if (fs.existsSync(path)) {
        data = JSON.parse(fs.readFileSync(path).toString());
    }
    guilds = data.guilds;
    console.log('Database successfully loaded!');
}

const save = (path) => {
    console.log("Attempt to save database...");
    fs.writeFileSync(path, JSON.stringify({guilds}, null, 4));
    console.log("Database successfully saved!");
}

const getGuildData = (guild) => {
    if (!guilds[guild.id]) {
        guilds[guild.id] = {
            prefix: "-",
            log: false,
            accounts: {}
        }
    }
    return guilds[guild.id];
}

module.exports = {
    load,
    save,
    getGuildData,
}