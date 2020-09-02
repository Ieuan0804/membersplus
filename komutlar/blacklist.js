const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db')

exports.run = (client, message, args) => {
  let kisi = args[0]
  if (!kisi || isNaN(kisi)) return message.reply('You must write an ID.')
  if (db.has(`blacklist_${kisi}`)) {
  db.delete(`blacklist_${kisi}`)
  message.channel.send(`Successfully removed blacklist of ${client.users.get(kisi) ? client.users.get(kisi).tag : kisi}.`)
  }else if (!db.has(`blacklist_${kisi}`)) {
  db.set(`blacklist_${kisi}`, 'yes')
  message.channel.send(`Successfully blacklisted ${client.users.get(kisi) ? client.users.get(kisi).tag : kisi}.`)
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'blacklist',
  description: '[YAPIMCI]',
  usage: 'reboot'
};
 