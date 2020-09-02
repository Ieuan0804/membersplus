const Discord = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');



exports.run = async (client, message, args) => {

  if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply(`You must have Administrator to use this command.`)
  if (!db.has(`sunucubul_${message.guild.id}`)) return message.reply(`There's not any order for this guild.`)
  if (!db.has(`sunucubul_${message.guild.id}.alan`)) return message.reply(`This order is in old type, so you can't use this until this order is completed.`)
  let verilecek = db.fetch(`sunucubul_${message.guild.id}.ekstrasiz`) - db.fetch(`sunucubul_${message.guild.id}.girenler`).length
  let ekstralar = db.fetch(`sunucubul_${message.guild.id}.ekstralar`)
    let ekstralardan = db.fetch(`sunucubul_${message.guild.id}.maksimum`)- db.fetch(`sunucubul_${message.guild.id}.ekstrasiz`)
    let tamamlananidler = []
    let yaridakalanid = []
    for (const e of db.fetch(`sunucubul_${message.guild.id}.ekstralar`)) {
      if (ekstralardan - Number(e.split(' - ')[1]) > 0) {
        tamamlananidler.push("" + e.split(' - ')[0] + "")
        ekstralardan = ekstralardan - Number(e.split(' - ')[1])
      }else{
        yaridakalanid.push("" + e.split(' - ')[0] + ' - ' + ekstralardan - e.split(' - ')[1] + "")
        ekstralardan = ekstralardan - Number(e.split(' - ')[1])
      }
    }
    console.log(tamamlananidler)
    console.log(yaridakalanid)
    console.log(ekstralar)
    db.add(`para_${db.fetch(`sunucubul_${message.guild.id}.alan`)}`, verilecek)
  for (const a of yaridakalanid) {
    db.add(`para_${a.split(' - ')[0]}`, a.split(' - ')[1])
  }
  let array = db.fetch(`transactions_${db.fetch(`sunucubul_${message.guild.id}.alan`)}`) || []
  array.unshift(`%${Date.now()}% - Canceled order by ${message.author.tag}. (+${verilecek})`)
  db.set(`transactions_${db.fetch(`sunucubul_${message.guild.id}.alan`)}`, array)
  db.delete(`sunucubul_${message.guild.id}`)
  message.reply(`Successfully cancelled the order and ${verilecek} coins gave to order owner.`)
       
}


          
    
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['ordercancel', 'cancel'],
    permLevel: 4,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'cancelorder',
    description: 'Hesabınızdan başka bir hesaba para transferi yaparsınız.',
    usage: 'transfer <@kullanıcı>',
}
