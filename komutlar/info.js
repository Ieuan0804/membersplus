const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
  
  function destructMS(milli) {
        if (isNaN(milli) || milli < 0) {
          return null;
        }
      
        var y, mo, w, d, h, m, s;
        s = Math.floor(milli / 1000);
        m = Math.floor(s / 60);
        s = s % 60;
        h = Math.floor(m / 60);
        m = m % 60;
        d = Math.floor(h / 24);
        h = h % 24;
        w = Math.floor(d / 7);
        d = d % 7;
        mo = Math.floor(w / 30);
        w = w % 30;
        y = Math.floor(mo / 12);
        mo = mo % 12;
        var yazi;
        if (y !== 0) yazi = `${y} years`;
        if (mo !== 0 && yazi) yazi = yazi + `, ${mo} months`;
        if (mo !== 0 && !yazi) yazi = `${mo} months`;
        if (w !== 0 && yazi) yazi = yazi + `, ${w} weeks`;
        if (w !== 0 && !yazi) yazi = `${w} weeks`;
        if (d !== 0 && yazi) yazi = yazi + `, ${d} days`;
        if (d !== 0 && !yazi) yazi = `${d} days`;
        if (h !== 0 && yazi) yazi = yazi + `, ${h} hours`;
        if (h !== 0 && !yazi) yazi = `${h} hours`;
        if (m !== 0 && yazi) yazi = yazi + `, ${m} minutes`;
        if (m !== 0 && !yazi) yazi = `${m} minutes`;
        if (s !== 0 && yazi) yazi = yazi + `, ${s} seconds`;
        if (s !== 0 && !yazi) yazi = `${s} seconds`;
        if (yazi) return yazi;
        if (!yazi) return `1 seconds`;
      };
  
  let sunucuismi = message.guild.name.toString()

  const cuk = new Discord.RichEmbed()
  .setTitle("Current order for " + sunucuismi)
  .setDescription(db.fetch(`sunucubul_${message.guild.id}`) ? `**Users:** ${db.fetch(`sunucubul_${message.guild.id}.girenler`).length} / ${db.fetch(`sunucubul_${message.guild.id}.maksimum`)}\n**Bought at:** ${destructMS(Date.now() - db.fetch(`sunucubul_${message.guild.id}.created`))} ago\n**Created by:** ${db.fetch(`sunucubul_${message.guild.id}.alan`) ? `<@` + db.fetch(`sunucubul_${message.guild.id}.alan`) + `>` : "Cannot selected"}\n**Invite:** ${db.fetch(`sunucubul_${message.guild.id}.davet`)}` : 'There\'s not an order for this server now.')
  if (db.has(`sunucubul_${message.guild.id}`) && db.has(`sunucubul_${message.guild.id}.reason`)) cuk.setDescription(cuk.description + `\n**Description:** ${db.fetch(`sunucubul_${message.guild.id}.reason`)}`)
  if (db.has(`sunucubul_${message.guild.id}`) && db.fetch(`sunucubul_${message.guild.id}.girenler`).length != 0) cuk.setDescription(cuk.description + `\n**Joined users:** <@${db.fetch(`sunucubul_${message.guild.id}.girenler`).join('> <@')}>`)
  cuk.setDescription(cuk.description.substring(0, 2000))
  cuk.setFooter("(C) 2020 Coins+ | " + ayarlar.sunuculink + " | " + ayarlar.versiyon)
  cuk.setColor("#2F3136")
  return   message.channel.send(cuk);
  
};
exports.conf = {
  enabled: true, //komutut açtık
  guildOnly: true, //sadece servere özel yapmadık
  aliases: [], //farklı çağrılar ekledik
  permLevel: 0 //kimlerin kullanabileceğini yazdık (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'info', //adını belirledik (kullanmak için gereken komut)
  description: 'Botun pingini gösterir', 
  usage: 'info'
};
