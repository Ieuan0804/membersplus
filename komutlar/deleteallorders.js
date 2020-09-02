const Discord = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');



exports.run = async (client, message, args) => {
  let alıcı = args[0]
  let reason = args.slice(2).join(' ') ? " for " + args.slice(2).join(' ') : ""
  if(!alıcı || isNaN(alıcı)) return message.channel.send(`You must write an user ID to delete all orders.`)
  let all = db.all().filter(i => i.ID.startsWith('sunucubul_') && db.fetch(`${i.ID}.alan`) == alıcı)
  if (all.length == 0) return message.channel.send(`You must write a correct user ID to delete all orders.`)
  message.channel.send(`Deleted ${client.users.get(alıcı) ? client.users.get(alıcı).tag : alıcı}'s ${all.length} orders${reason}.`)
  let array = db.fetch(`transactions_${message.author.id}`) || []
  array.unshift(`%${Date.now()}% - You deleted a user's ${all.length} orders${reason}. (0)`)
  db.set(`transactions_${message.author.id}`, array)
  let arraya = db.fetch(`transactions_${db.fetch(`sunucubul_${alıcı}.alan`)}`) || []
  arraya.unshift(`%${Date.now()}% - Admin deleted the your ${all.length} orders${reason}. (0)`)
  db.set(`transactions_${db.fetch(`sunucubul_${alıcı}.alan`)}`, arraya)
  for (const i of all) db.delete(i.ID)
}


          
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['orderdeleteall', 'deleteallorder'],
    permLevel: 4,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'deleteallorders',
    description: 'Hesabınızdan başka bir hesaba para transferi yaparsınız.',
    usage: 'transfer <@kullanıcı>',
}
