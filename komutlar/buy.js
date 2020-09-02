const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {
let sunucuismi = message.guild.name.toString()
  let user = message.author;
  let para = db.fetch(`para_${user.id}`);
  let paraa = args[0]
  let sunucusayısı = -paraa
  let ücret = 1
  
 if (!paraa) return message.channel.send('You must provide a coin amount.')
 if (isNaN(paraa)) return message.channel.send('You must provide a correct coin amount.')
 if (paraa <= 0) return message.channel.send('You must provide a coin amount that higher than 0.')
 if (para < paraa) {
      message.channel.send('You have no money.')
  } else if (para >= paraa) {
    let prefix = db.fetch(`prefix_${message.guild.id}`) || "."
    if (args.slice(1).join(' ') && args.slice(1).join(' ').length > 72) return message.channel.send(`You can't write a description that longer than 72 characters.`)
    message.channel.send('Purchasing...').then(async msg => {
      if (db.has(`sunucubul_${message.guild.id}`)) {
      db.set(`sunucubul_${message.guild.id}.maksimum`, Number(db.fetch(`sunucubul_${message.guild.id}.maksimum`)) + Number(paraa))
      const embed = new Discord.RichEmbed()
        .setTitle("Order For " + sunucuismi)
        .setDescription(`Your guild already has an order, so ${paraa} members added to your order! ` + "\n\n**This server's name:** " + sunucuismi + '\n**Server\'s link created by bot:** ' + db.fetch(`sunucubul_${message.guild.id}.davet`))
        .setFooter("(C) 2020 Coins+ | " + ayarlar.sunuculink + " | " + ayarlar.versiyon)
      .setColor("#2F3136")
        if (db.has(`sunucubul_${message.guild.id}.reason`) && !args.slice(1).join(' ')) embed.setDescription(`${embed.description}\n**Description:** ${db.fetch(`sunucubul_${message.guild.id}.reason`)}`)
        if (!db.has(`sunucubul_${message.guild.id}.reason`) && args.slice(1).join(' ')) {
          embed.setDescription(`${embed.description}\n**Description:** ${args.slice(1).join(' ')}\nAlso changed the description.`)
          db.set(`sunucubul_${message.guild.id}.reason`, args.slice(1).join(' '))
        }
        if (db.has(`sunucubul_${message.guild.id}.reason`) && args.slice(1).join(' ')) {
          embed.setDescription(`${embed.description}\n**Description:** ${args.slice(1).join(' ')}\nAlso changed the description.`)
          db.set(`sunucubul_${message.guild.id}.reason`, args.slice(1).join(' '))
        }
        msg.edit('', {embed: embed})
        let array = db.fetch(`transactions_${message.author.id}`) || []
        array.unshift(`%${Date.now()}% - Bought advertisement. (-${paraa})`)
        db.set(`transactions_${message.author.id}`, array)
        db.add(`sayi_${message.author.id}`, parseInt(paraa))
        db.add(`para_${message.author.id}`, -paraa)
        db.push(`sunucubul_${message.guild.id}.ekstralar`, `${message.author.id} - ${paraa}`)
    }else{
    message.guild.fetchInvites().then(async allinvites => {
    for (const invite of allinvites.array()) {
      if (invite.inviter.id == client.user.id) invite.delete()
    }
    setTimeout(() => {
message.guild.channels.filter(c => c.type == "text").first().createInvite().then(a => {
  let davet = "https://discord.gg/" + a.code
db.add(`sayi_${message.author.id}`, parseInt(paraa))
    db.add(`para_${message.author.id}`, -paraa)
 db.set(`sunucubul_${message.guild.id}`, {davet: davet, isim: sunucuismi, kullanim: 0, maksimum: Number(paraa), girenler: [], created: Date.now(), alan: message.author.id, asılalan: message.author.id, ekstralar: [], ekstrasiz: Number(paraa)})
  if (args.slice(1).join(' ')) db.set(`sunucubul_${message.guild.id}.reason`, args.slice(1).join(' '))
    let allofalim = db.all().filter(i => i.ID.startsWith(`uyealim_${message.guild.id}_`))
 db.set(`uyealim_${message.guild.id}_${allofalim.length + 1}`, {davet: davet, isim: sunucuismi, maksimum: Number(paraa), created: Date.now(), girenler: []})
  db.set(`uyealim_${message.guild.id}`, {girenler: []})
  if (args.slice(1).join(' ')) db.set(`uyealim_${message.guild.id}_${allofalim.length + 1}`, args.slice(1).join(' '))

        const embed = new Discord.RichEmbed()
        .setAuthor("Success " + sunucuismi, message.guild.iconURL)
        .setDescription(`Use ${prefix}info to track it progress! ` + "\n\n**This server's name:** " + sunucuismi)
        .setColor("#2F3136")
        if (args.slice(1).join(' ')) embed.setDescription(`${embed.description}\n**Description:** ${args.slice(1).join(' ')}`)
        msg.edit('', {embed: embed})
        let array = db.fetch(`transactions_${message.author.id}`) || []
        array.unshift(`%${Date.now()}% - Bought advertisement. (-${paraa})`)
        db.set(`transactions_${message.author.id}`, array)

    })
    }, 1000)
  })
    }
    })
  }
};

exports.conf = {
  enabled: true, //komutut açtık
  guildOnly: false, //sadece servere özel yapmadık
  aliases: ['ping','p'], //farklı çağrılar ekledik
  permLevel: 0 //kimlerin kullanabileceğini yazdık (bot.js dosyasında perm leveller yazıyor)
};

exports.help = {
  name: 'buy', //adını belirledi (kullanmak için gereken komut)
  description: 'Botun pingini gösterir', //açıklaması
  usage: 'buy' //komutun kullanım şekli (mesela hava <bölge>)
};

//komut taslağımız basit anlatımını zaten dosyalarda bulursunuz
//bu ise bizim komut taslağımız
//bunun üzerinden gideceğiz