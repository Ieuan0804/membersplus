const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db')

exports.run = (client, message, args) => {

  let kisi = args[0]
  if (!kisi || isNaN(kisi)) return message.reply('You must write an ID.')
  if (!db.has(`transactions_${kisi}`)) return message.reply('You must write a valid ID.')
  let para = db.fetch(`para_${kisi}`)
  
  const cuk = new Discord.RichEmbed()
  .setAuthor(`${client.users.get(kisi) ? client.users.get(kisi).tag : "Couldn't find the name"} coins`, client.users.get(kisi) ? client.users.get(kisi).displayAvatarURL : client.user.displayAvatarURL)
  .setTitle(`**${para.toLocaleString()} coins**`)
  .setColor("#2F3136")
  message.channel.send(cuk)
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['checkbal'],
  permLevel: 3
};

exports.help = {
  name: 'checkbalance',
  description: '[YAPIMCI]',
  usage: 'reboot'
};
 