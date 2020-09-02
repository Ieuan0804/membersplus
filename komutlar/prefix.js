const Discord = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');



exports.run = async (client, message, args) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`You must have Administrator to use this command.`)
  let prefix = args[0]
  if (!prefix) return message.channel.send('You must provide a prefix to change, or write "reset" to reset.')
  if (prefix == "reset") {
    db.delete(`prefix_${message.guild.id}`)
    return message.channel.send('Resetted the prefix as `' + prefix + '`!')
  }
  if (prefix.length > 6) return message.channel.send('A prefix can\'t be longer than 6 characters.')
  if (!isNaN(prefix)) return message.channel.send('A prefix can\'t be a number.')
  db.set(`prefix_${message.guild.id}`, prefix)
  message.channel.send('Successfully setted the prefix as `' + prefix + '`!')
}


          
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['setprefix'],
    permLevel: 0,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'prefix',
    description: 'Hesabınızdan başka bir hesaba para transferi yaparsınız.',
    usage: 'transfer <@kullanıcı>',
}
