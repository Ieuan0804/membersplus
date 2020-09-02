const Discord = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');



exports.run = async (client, message, args) => {
  let alıcı = args[0]
  let gönderici = message.author
  let reason = args.slice(2).join(' ') ? " for " + args.slice(2).join(' ') : ""
  if(!alıcı || isNaN(alıcı)) return message.channel.send(`You must write an user ID to reset coin.`)
  const transbakiye = await db.fetch(`para_${alıcı.id}`);
  db.set(`para_${alıcı}`, 0)
  message.channel.send(`Reseted ${client.users.get(alıcı) ? client.users.get(alıcı).tag : alıcı}'s Coins${reason}.`)
  let array = db.fetch(`transactions_${alıcı}`) || []
  array.unshift(`%${Date.now()}% - Admin reseted your coins${reason}. (reset)`)
  db.set(`transactions_${alıcı}`, array)
  let arraya = db.fetch(`transactions_${message.author.id}`) || []
  arraya.unshift(`%${Date.now()}% - You reseted coins of ${client.users.get(alıcı) ? client.users.get(alıcı).tag : alıcı}${reason}. (0)`)
  db.set(`transactions_${message.author.id}`, arraya)
}


          
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['parasıfırla', 'reset', 'sıfırla', 'resetcoins'],
    permLevel: 4,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'resetcoin',
    description: 'Hesabınızdan başka bir hesaba para transferi yaparsınız.',
    usage: 'transfer <@kullanıcı>',
}
