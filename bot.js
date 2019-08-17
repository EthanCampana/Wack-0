const Discord = require('discord.js');
const fetch = require("node-fetch");
var auth = require('../auth.json');
const commando = require('discord.js-commando');
const client = new commando.Client();


client.registry.registerGroup('movie','Movie');
client.registry.registerDefaultTypes();
client.registry.registerDefaultGroups();
client.registry.registerDefaultCommands();
client.registry.registerCommandsIn(__dirname + "/commands");

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });


client.login(auth.Wacky);