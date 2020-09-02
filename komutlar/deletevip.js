const Discord = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');



exports.run = async (client, message, args) => {
  let alıcı = args[0]
  let gönderici = message.author
  let reason = args.slice(2).join(' ') ? " for " + args.slice(2).join(' ') : ""
  if(!alıcı || isNaN(alıcı)) return message.channel.send(`You must write an user ID to delete VIP.`)
  db.delete(`vipuyelik_${alıcı}`)
  message.channel.send(`Deleted ${client.users.get(alıcı) ? client.users.get(alıcı).tag : alıcı}'s VIP${reason}.`)
  let array = db.fetch(`transactions_${alıcı}`) || []
  array.unshift(`%${Date.now()}% - Admin deleted your VIP${reason}. (reset)`)
  db.set(`transactions_${alıcı}`, array)
  let arraya = db.fetch(`transactions_${message.author.id}`) || []
  arraya.unshift(`%${Date.now()}% - You deleted VIP of ${client.users.get(alıcı) ? client.users.get(alıcı).tag : alıcı}${reason}. (0)`)
  db.set(`transactions_${message.author.id}`, arraya)
}


          
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['vipdelete'],
    permLevel: 4,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'deletevip',
    description: 'Hesabınızdan başka bir hesaba para transferi yaparsınız.',
    usage: 'transfer <@kullanıcı>',
}
