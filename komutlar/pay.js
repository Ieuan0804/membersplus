const Discord = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');



exports.run = async (client, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || "."
  let alıcı = message.mentions.users.first()
  let gönderici = message.author
  let para = args[1]
  let reason = args.slice(2).join(' ') ? " for " + args.slice(2).join(' ') : ""
  if(alıcı == gönderici) return message.channel.send(`You cannot pay yourself what you already have.`)
  if(!alıcı) return message.channel.send(`Inproper Formatting, please have a valid username, id, mention and amount.\nEX: ${prefix}pay @Mention 10`)
  if(!para) return message.channel.send(`Please enter a number like ${prefix}pay @Mention 10`)
  const bakiye = await db.fetch(`para_${gönderici.id}`);
  
  const transbakiye = await db.fetch(`para_${alıcı.id}`);

            if(bakiye < para) return message.channel.send(`:warning: You don't have enough coins!`)
            if(para < 8) return message.channel.send(`:warning: You need to pay a minimum of 8 coins to another user.`)
            if(para > 10000) return message.channel.send(`:warning: You need to pay a maximum of 10000 coins to another user.`)
                db.add(`para_${message.author.id}`, parseInt(-para))
                db.add(`para_${alıcı.id}`, parseInt(para))
            message.channel.send(`Paid ${alıcı} ${para} Coins${reason}.`)
            let array = db.fetch(`transactions_${alıcı.id}`) || []
            array.unshift(`%${Date.now()}% - ${message.author.username} sent ${para} coins${reason}. (+${para})`)
            db.set(`transactions_${alıcı.id}`, array)
            let arraya = db.fetch(`transactions_${message.author.id}`) || []
            arraya.unshift(`%${Date.now()}% - You sent ${para} coins to ${alıcı.username}${reason}. (-${para})`)
            db.set(`transactions_${message.author.id}`, arraya)
       }


          
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['paragonder', 'paragönder', 'para-gonder', 'para-gönder'],
    permLevel: 0,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'pay',
    description: 'Hesabınızdan başka bir hesaba para transferi yaparsınız.',
    usage: 'transfer <@kullanıcı>',
}
