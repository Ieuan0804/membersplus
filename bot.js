//consts (for glitch)
// GEREKLİ YERLER
const express = require('express');
const app = express();
const http = require('http');
// GEREKLİ YERLER
// -------------------------------------------------------------
const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const Jimp = require('jimp');
const db = require('quick.db');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('ready', async () => {
  app.get("/", (request, response) => {
    console.log(` az önce pinglenmedi. Sonra ponglanmadı... ya da başka bir şeyler olmadı.`);
    response.sendStatus(200);
    });
    app.listen(process.env.PORT);
    setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
    }, 280000);
})

client.on('message', async message => {
	if (message.content === '.ekle') {
		client.emit('guildCreate', message.guild || await message.guild.fetchMember(message.author));
	}
});


client.on("guildCreate", guild => {
    let everyonerole = guild.roles.find(r => r.name == "@everyone").id
      let channelID;
    let channels = guild.channels.array();
    for (const c of channels) {
        let channelType = c.type;
        if (channelType === "text") {
            channelID = c.id;
      }
    }

    let channel = client.channels.get(guild.systemChannelID || channelID);
  
    let newserverEmbed = new Discord.RichEmbed()
    .setAuthor(`Info`, client.user.avatarURL)
    .setThumbnail(client.user.avatarURL)
    .setDescription(`__Thanks for adding Coins+ to your server!__ :smiley:
Use \`.help\` to get a list of commands. If you need more information, you can look at the [discord server](https://discord.gg/WSsZWtp).
It's also recommended to join our [discord server](https://discord.gg/WSsZWtp) to get notified about future updates.
If you decide to use Coins+, **you and all your members need to accept our [Terms of Service!](https://discord.gg/WSsZWtp)**`)
    .setColor("#5DBCD2")
if (client.channels.get(channelID)) client.channels.get(channelID).send(newserverEmbed)
})

client.on('guildCreate', async guild => {
  if (guild.members.size < 100) return;
  if (db.has(`coinaldi_${guild.id}`)) return;
  if (guild.me.hasPermission('VIEW_AUDIT_LOG')) {
    guild.fetchAuditLogs({type: 'BOT_ADD'}).then(async logs => {
      db.add(`para_${logs.entries.first().executor.id}`, 10);
      let array = db.fetch(`transactions_${logs.entries.first().executor.id}`) || []
      array.unshift(`%${Date.now()}% - Added the bot. (+10)`)
      db.set(`transactions_${logs.entries.first().executor.id}`, array)
    });
  };
  if (!guild.me.hasPermission('VIEW_AUDIT_LOG')) {
     db.add(`para_${guild.owner.id}`, 50);
     let array = db.fetch(`transactions_${guild.owner.id}`) || []
     array.unshift(`%${Date.now()}% - Added the bot. (+50)`)
     db.set(`transactions_${guild.owner.id}`, array)
  }
  db.set(`coinaldi_${guild.id}`, 'yes')
});

client.on('guildMemberAdd', async member => {
  
  member.guild.fetchInvites().then(async invites => {
    for (const invite of invites.array()) {
      if (invite.inviter.id == client.user.id) {
        if (!db.has(`sunucubul_${member.guild.id}`)) return;
        if (invite.uses != db.fetch(`sunucubul_${member.guild.id}.kullanim`)) {
          if (db.fetch(`sunucubul_${member.guild.id}.girenler`).includes(member.id)) return;
          db.add(`sunucubul_${member.guild.id}.kullanim`, 1)
          if (db.has(`vipuyelik_${member.id}`)) db.add(`para_${member.id}`, 2)
          if (!db.has(`vipuyelik_${member.id}`)) db.add(`para_${member.id}`, 1)
          db.set(`sunucuyakatilma_${member.id}_${member.guild.id}`, Date.now())
          let array = db.fetch(`transactions_${member.id}`) || []
          if (db.has(`vipuyelik_${member.id}`)) array.unshift(`%${Date.now()}% - Joined to a guild. (+2)`)
          if (!db.has(`vipuyelik_${member.id}`)) array.unshift(`%${Date.now()}% - Joined to a guild. (+1)`)
          db.set(`transactions_${member.id}`, array)
          if (!db.fetch(`sunucubul_${member.guild.id}.girenler`).includes(member.id)) db.push(`sunucubul_${member.guild.id}.girenler`, member.id)
          if (!db.fetch(`uyealim_${member.guild.id}.girenler`).includes(member.id)) db.push(`uyealim_${member.guild.id}.girenler`, member.id)
          if (db.fetch(`sunucubul_${member.guild.id}.maksimum`) == db.fetch(`sunucubul_${member.guild.id}.kullanim`)) {
            db.delete(`sunucubul_${member.guild.id}`)
          }
        }
      }
    }
  })
})

client.on('guildMemberRemove', async member => {
  member.guild.fetchInvites().then(async invites => {
    for (const invite of invites.array()) {
      if (invite.inviter.id == client.user.id) {
        if (db.has(`uyealim_${member.guild.id}.girenler`) && db.fetch(`uyealim_${member.guild.id}.girenler`).includes(member.id)) {
          if (!member.guild.members.has(member.id)) {
            if (db.has(`sunucubul_${member.guild.id}`)) {
            db.subtract(`sunucubul_${member.guild.id}.kullanim`, 1)
            let array = db.fetch(`sunucubul_${member.guild.id}.girenler`)
            let index = array.indexOf(member.id)
            array.splice(index, 1)
            db.set(`sunucubul_${member.guild.id}.girenler`, array)
            }
            let arraya = db.fetch(`uyealim_${member.guild.id}.girenler`)
            let indexe = arraya.indexOf(member.id)
            arraya.splice(indexe, 1)
            db.set(`uyealim_${member.guild.id}.girenler`, arraya)
            if (Date.now() - db.fetch(`sunucuyakatilma_${member.id}_${member.guild.id}`) <= 604800000) {
              if (db.has(`vipuyelik_${member.id}`)) db.subtract(`para_${member.id}`, 1.5)
              if (!db.has(`vipuyelik_${member.id}`)) db.subtract(`para_${member.id}`, 2)
              let array = db.fetch(`transactions_${member.id}`) || []
              if (db.has(`vipuyelik_${member.id}`)) array.unshift(`%${Date.now()}% - Leaved from a guild without waiting 1 week. (-1.5)`)
              if (!db.has(`vipuyelik_${member.id}`)) array.unshift(`%${Date.now()}% - Leaved from a guild without waiting 1 week. (-2)`)
              db.set(`transactions_${member.id}`, array)
            }
            db.delete(`sunucuyakatilma_${member.id}_${member.guild.id}`)
          }
        }
      }
    }
  })
})


client.on('guildDelete', guild => {

let rrrsembed = new Discord.RichEmbed()

.setColor("BLACK")
.setTitle("<:coins:735182230565159012>**Bot Atıldı!**")
.addField("<:coins:735182230565159012>**Sunucu Adı:**", guild.name)
.addField("<:coins:735182230565159012>**Sunucu sahibi**", guild.owner)
.addField("<:coins:735182230565159012>**Sunucu ID'si**", guild.id)
.addField("<:coins:735182230565159012>Sunucudaki Kişi Sayısı:", guild.memberCount)

   client.channels.get('735367366954975362').send(rrrsembed);
  
});


client.on('guildCreate', guild => {

let rrrsembed = new Discord.RichEmbed()

.setColor("GREEN")
.setTitle("<:coins:735182230565159012>**Bot Eklendi** ")
.addField("<:coins:735182230565159012>**Sunucu Adı:**", guild.name)
.addField("<:coins:735182230565159012>**Sunucu sahibi**", guild.owner)
.addField("<:coins:735182230565159012>**Sunucu ID'si**", guild.id)
.addField("<:coins:735182230565159012>**Sunucudaki Kişi Sayısı:**", guild.memberCount)
.addField('<:coins:735182230565159012>**Davet Linki:**', guild.channels.random().createInvite().then(a => kanal.send(a.toString())))

let kanal =   client.channels.get('735367366954975362')
kanal.send(rrrsembed);
  
});

//////////////////
client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  if (message.author.id === ayarlar.sahip2) permlvl = 4;
  if (message.author.id === ayarlar.sahip3) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
