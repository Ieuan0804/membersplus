const Discord = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');



exports.run = async (client, message, args) => {
  let alıcı = args[0]
  let reason = args.slice(2).join(' ') ? " for " + args.slice(2).join(' ') : ""
  if(!alıcı || isNaN(alıcı)) return message.channel.send(`You must write an server ID to delete order.`)
  if (!db.has(`sunucubul_${alıcı}`)) return message.channel.send(`You must write a correct server ID to delete order.`)
  message.channel.send(`Deleted ${client.guilds.get(alıcı) ? client.guilds.get(alıcı).name : alıcı}'s order${reason}.`)
  let array = db.fetch(`transactions_${message.author.id}`) || []
  array.unshift(`%${Date.now()}% - You deleted a server's order${reason}. (0)`)
  db.set(`transactions_${message.author.id}`, array)
  let arraya = db.fetch(`transactions_${db.fetch(`sunucubul_${alıcı}.alan`)}`) || []
  arraya.unshift(`%${Date.now()}% - Admin deleted the server's order${reason}. (0)`)
  db.set(`transactions_${db.fetch(`sunucubul_${alıcı}.alan`)}`, arraya)
  db.delete(`sunucubul_${alıcı}`)
}


          
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['orderdelete'],
    permLevel: 4,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'deleteorder',
    description: 'Hesabınızdan başka bir hesaba para transferi yaparsınız.',
    usage: 'transfer <@kullanıcı>',
}
