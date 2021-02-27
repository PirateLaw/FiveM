const Discord = require('discord.js');
const PREFIX = '!';
const fs = require('fs');
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"]});
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

client.on("ready",() =>{
    console.log(`${client.user.tag} has logged in`);
      client.user.setActivity('ARP | FiveM', { type: 'WATCHING'});
      
      let counter = 0;
      setInterval(() => {
        counter++;
        if(counter == 1) {
          client.user.setActivity('Over FiveM', { type: 'WATCHING'});
        } else if(counter == 2) {
          client.user.setActivity('160 members', { type: 'LISTENING'});
        } else if(counter == 3) {
          client.user.setActivity('FiveM', { type: 'PLAYING'});
          counter = 0;
        }
      },4000);
  });

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Server Member');

    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('801985602999549957').send(`Welcome <@${guildMember.user.id}> to ARP | FiveM Server! Make sure to read server rules!`);
});

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === '- Civilian Operations -');

    guildMember.roles.add(welcomeRole);
});

client.on('guildMemberAdd', guildMember =>{
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'Civilian');

    guildMember.roles.add(welcomeRole);
});

client.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
   
    const args = message.content.slice(PREFIX.length).split(/ +/); 
    const command = args.shift().toLowerCase();
});

for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
};

client.login('ODE0OTIzMDkyMzQ5OTQzODY5.YDk6RQ.A5AfVz_jpDdPSTBmCXvUR4UiJFw');