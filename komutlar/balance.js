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
  
  var para = await db.fetch(`para_${message.author.id}`)
  
  var paraa;
  
  if(para == undefined) {
  } else {
  paraa = para.toLocaleString()
  }

  let transactionss = db.fetch(`transactions_${message.author.id}`) || []
  let transactions = String()
  for (const transaction of transactionss.slice(0, 5)) {
    let date = transaction.split('%')[1]
    transactions += `\n:arrow_right: ${destructMS(Date.now() - Number(date))} ${transaction.replace('%', '').replace('% ', '').replace(date, '')}`
  }
  
  const cuk = new Discord.RichEmbed()
  .setAuthor(message.author.username + "'s Coin Balance")
  .setTitle(`**${paraa || '0'} coins**`)
  .addField("Transactions", db.fetch(`transactions_${message.author.id}`) ? transactions : 'Nothing')
  .setColor("#2F3136")
  .setThumbnail(message.author.avatarURL)
  return   message.channel.send(cuk);
  
};
exports.conf = {
  enabled: true, //komutut açtık
  guildOnly: false, //sadece servere özel yapmadık
  aliases: ["bal"], //farklı çağrılar ekledik
  permLevel: 0 //kimlerin kullanabileceğini yazdık (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'balance', //adını belirledik (kullanmak için gereken komut)
  description: 'Botun pingini gösterir', //açıklaması
  usage: 'balance' //komutun kullanım şekli (mesela hava <bölge>)
};
