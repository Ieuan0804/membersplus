const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db')

exports.run = (client, message, args) => {
  
  let all = db.all().filter(i => i.ID.startsWith('sunucubul_') && client.guilds.get(i.ID.replace('sunucubul_', '')))
  let olanlar = String()
  
  for (const i of all) olanlar += `\n${client.guilds.get(i.ID.replace('sunucubul_', '')).name} - ${i.ID.replace('sunucubul_', '')}`

  const cuk = new Discord.RichEmbed()
  .setTitle('All servers that has order now')
  .setDescription('There\'s ' + all.length + ' servers that has order now.\n ' + olanlar.substring(0, 2000))
  .setColor("#2F3136")
  if (olanlar.length > 2048) {
    cuk.addField('.', olanlar.substring(2048, 4096))
    if (olanlar.length > 4096) cuk.addField('.', olanlar.substring(4096, 6144))
  }
  message.channel.send(cuk)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['allserver'],
  permLevel: 3
};

exports.help = {
  name: 'allservers',
  description: '[YAPIMCI]',
  usage: 'reboot'
};
 