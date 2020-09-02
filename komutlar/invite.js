const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
  let sunucuismi = message.guild.name.toString()

  const cuk = new Discord.RichEmbed()
  .setTitle("Invite the bot")
  .setDescription(`[invite link](https://discord.com/oauth2/authorize?client_id=737316728182145084&scope=bot&permissions=2146958847)`)
  .setURL("https://discord.com/oauth2/authorize?client_id=737316728182145084&scope=bot&permissions=2146958847")
  .setColor("#2F3136")
  return   message.channel.send(cuk);
  
};
exports.conf = {
  enabled: true, //komutut açtık
  guildOnly: false, //sadece servere özel yapmadık
  aliases: ["inv"], //farklı çağrılar ekledik
  permLevel: 0 //kimlerin kullanabileceğini yazdık (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'invite', //adını belirledik (kullanmak için gereken komut)
  description: 'Botun pingini gösterir', 
  usage: 'invite'
};
