const Discord = require('discord.js');
const moment = require('moment');
const db = require('quick.db')

exports.run = (client, message, args) => {
  
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

  let kisi = args[0]
  if (!kisi || isNaN(kisi)) return message.reply('You must write an ID.')
  if (!db.has(`transactions_${kisi}`)) return message.reply('You must write a valid ID.')
  
  let transactionss = db.fetch(`transactions_${kisi}`) || []
  let transactions = String()
  for (const transaction of transactionss.slice(0, 30)) {
    let date = transaction.split('%')[1]
    transactions += `\n:arrow_right: ${destructMS(Date.now() - Number(date))} ${transaction.replace('%', '').replace('% ', '').replace(date, '')}`
  }
  
  const cuk = new Discord.RichEmbed()
  .setAuthor(`${client.users.get(kisi) ? client.users.get(kisi).tag : kisi} transactions`, client.users.get(kisi) ? client.users.get(kisi).displayAvatarURL : client.user.displayAvatarURL)
  .setColor("#2F3136")
  cuk.setDescription(transactions.substring(0, 2048))
  if (transactions.length >= 2048){
    cuk.addField('.', transactions.substring(2048, 4096))
    if (transactions.length >= 4096) cuk.addField('.', transactions.substring(4096, 6144))
  }
  message.channel.send(cuk)
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 3
};

exports.help = {
  name: 'transactions',
  description: '[YAPIMCI]',
  usage: 'reboot'
};
 