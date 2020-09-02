const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args, promise) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || "."
  
  if (!message.author.avatarURL) return message.reply(`Please upload a profile picture to your Discord account before using this command. This may take time after you upload a picture!`)
  // geçiçi olarak kapalı //if (Date.now() - message.author.createdTimestamp <= 259200000) return message.reply(`Your account's age must be higher than 3 days to use this command!`)
  
  let secilensunucular = [];
  
  let sunucualle = db.all().filter(i => i.ID.startsWith(`sunucubul_`) && client.guilds.get(i.ID.replace('sunucubul_', '')) && !client.guilds.get(i.ID.replace('sunucubul_', '')).members.get(message.author.id))
  
  async function rastgelesec() {
    if (sunucualle.length == 0) return;
    if (sunucualle.length == secilensunucular.length) return;
    let secilensunucu = sunucualle[Math.floor(Math.random() * sunucualle.length)]
    if (!client.guilds.get(secilensunucu.ID.replace('sunucubul_', ''))) return rastgelesec()
    if (secilensunucular.includes(secilensunucu.ID.replace('sunucubul_', ''))) return rastgelesec()
    secilensunucular.push(secilensunucu.ID.replace('sunucubul_', ''))
  }

  if (db.has(`vipuyelik_${message.author.id}`)) {
    for (var i = 0; i < 5; i++) {
      rastgelesec()
    }
  }
  if (!db.has(`vipuyelik_${message.author.id}`)) {
    for (var i = 0; i < 3; i++) {
      rastgelesec()
    }
  }
  const cuk = new Discord.RichEmbed()
  .setAuthor("Server Finder", client.user.avatarURL)
  .setDescription(message.author + ' **Join the server below to earn 1 coins\n\n **__Servers to join for coins__)')
  .setThumbnail(message.author.avatarURL)
  for (const i of secilensunucular) {
    if (client.guilds.get(i).name.length > 25) {
      if (db.has(`sunucubul_${i}.reason`)) cuk.addField(client.guilds.get(i).name.substring(0, 25) + "...", `${db.fetch(`sunucubul_${i}.reason`).substring(0, 72)}\n` + db.fetch(`sunucubul_${i}.davet`) + `\n——————————————`)
      if (!db.has(`sunucubul_${i}.reason`)) cuk.addField(client.guilds.get(i).name.substring(0, 25) + "...", db.fetch(`sunucubul_${i}.davet`) + `\n——————————————`)
    }
    if (client.guilds.get(i).name.length <= 25) {
      if (db.has(`sunucubul_${i}.reason`)) cuk.addField(client.guilds.get(i).name, `${db.fetch(`sunucubul_${i}.reason`).substring(0, 72)}\n` + db.fetch(`sunucubul_${i}.davet`) + `\n——————————————`)
      if (!db.has(`sunucubul_${i}.reason`)) cuk.addField(client.guilds.get(i).name, db.fetch(`sunucubul_${i}.davet`) + `\n——————————————`)
    }
  }
  cuk.addBlankField()
  cuk.addBlankField()
  cuk.setColor("#2F3136")
  return   message.channel.send(cuk);
  
};
exports.conf = {
  enabled: true, //komutut açtık
  guildOnly: false, //sadece servere özel yapmadık
  aliases: ["find","f"], //farklı çağrılar ekledik
  permLevel: 0 //kimlerin kullanabileceğini yazdık (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'sunucubul', //adını belirledik (kullanmak için gereken komut)
  description: 'Botun pingini gösterir', //açıklaması
  usage: 'sunucubul' //komutun kullanım şekli (mesela hava <bölge>)
};
