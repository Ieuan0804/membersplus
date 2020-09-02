const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');

exports.run = function(client, message, args) {
  
  let menu = args[0]
  let prefix = db.fetch(`prefix_${message.guild.id}`) || "+"
  
  const cuk = new Discord.RichEmbed()
  .setAuthor("Help", message.author.avatarURL)
  .setDescription('If you need more help please ask for it on our support server: https://discord.gg/qu3ZFe by making a ticket.')
  //.addField(".vote", `Get free coins without joining any servers.`)
  .addField(`${prefix}invite`, `Invite the bot to your server.`)
  .addField(`${prefix}help members`, `Commands to get members on your server.`)
  .addField(`${prefix}help economy`, `Commands to manage your coins.`)
  //.addField(`${prefix}purchase`, `Get coins without having to join servers.`)
  .setColor("#2F3136")
  .setThumbnail(message.author.avatarURL)
  if (!menu) message.channel.send(cuk);
  
  if (menu == 'members') {
  
  const cuk = new Discord.RichEmbed()
  .setAuthor("Help", message.author.avatarURL)
  .setDescription('If you need more help please ask for it on our support server: https://discord.gg/qu3ZFe by making a ticket.')
  .addField("Find servers to join for coins", `Find servers to join, each time getting a certain amount of coins. \n**${prefix}f or ${prefix}find**`)
  .addField("Buy guarenteed joins to your server. 1 coin = 1 join.", `Check '${prefix}help economy' to learn more about coins. \n**${prefix}buy <coin amount>**`)
    .addField("Cancel your order. Remaining coin will be delivered to you.", `Do you want to cancel your order? Use this command to cancel order. \n **${prefix}cancelorder**`)
  .addField("See your current order progress.", `See how far your order is and how many people have joined so far. \n **${prefix}info**`)
  .setColor("#2F3136")
  .setThumbnail(message.author.avatarURL)
  return message.channel.send(cuk);
    
  }
  
  if (menu == 'economy') {
  
  const cuk = new Discord.RichEmbed()
  .setAuthor("Help", message.author.avatarURL)
  .setDescription('If you need more help please ask for it on our support server: https://discord.gg/WSsZWtp by making a ticket.')
  .addField("Check your current coin balance", `See how many coins you have spent or got. \n**${prefix}bal**`)
  .addField("Pay another user coins", `Pay your friends for stuff with the pay command. \n**${prefix}pay @user #amount reason**`)
  .setColor("#2F3136")
  .setThumbnail(message.author.avatarURL)
  return message.channel.send(cuk);
    
  }
  
};
exports.conf = {
  enabled: true, //komutut açtık
  guildOnly: false, //sadece servere özel yapmadık
  aliases: [], //farklı çağrılar ekledik
  permLevel: 0 //kimlerin kullanabileceğini yazdık (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'help', //adını belirledik (kullanmak için gereken komut)
  description: 'Botun pingini gösterir', //açıklaması
  usage: 'help' //komutun kullanım şekli (mesela hava <bölge>)
};
