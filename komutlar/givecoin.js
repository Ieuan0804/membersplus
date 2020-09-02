const Discord = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');



exports.run = async (client, message, args) => {
  let alıcı = args[0]
  let gönderici = message.author
  let para = args[1]
  let reason = args.slice(2).join(' ') ? " for " + args.slice(2).join(' ') : ""
  if(!alıcı || isNaN(alıcı)) return message.channel.send(`You must write an user ID to give coin.`)
  if(!para) return message.channel.send(`Please enter a coin number.`)
  const transbakiye = await db.fetch(`para_${alıcı.id}`);
  db.add(`para_${alıcı}`, parseInt(para))
  message.channel.send(`Gave ${client.users.get(alıcı) ? client.users.get(alıcı).tag : alıcı} ${para} Coins${reason}.`)
  let array = db.fetch(`transactions_${alıcı}`) || []
  array.unshift(`%${Date.now()}% - Admin gave you ${para} coins${reason}. (+${para})`)
  db.set(`transactions_${alıcı}`, array)
  let arraya = db.fetch(`transactions_${message.author.id}`) || []
  arraya.unshift(`%${Date.now()}% - You gave ${para} coins to ${client.users.get(alıcı) ? client.users.get(alıcı).tag : alıcı}${reason}. (0)`)
  db.set(`transactions_${message.author.id}`, arraya)
}


          
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['paraver', 'give', 'givecoins'],
    permLevel: 4,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'givecoin',
    description: 'Hesabınızdan başka bir hesaba para transferi yaparsınız.',
    usage: 'transfer <@kullanıcı>',
}
