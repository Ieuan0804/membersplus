const Discord = require('discord.js');
const moment = require('moment');
const os = require('os');
let cpuStat = require("cpu-stat");
const { stripIndents } = require('common-tags');
require('moment-duration-format');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')

exports.run = async (bot, message, args) => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || "."
  
  
  
  var m = await message.channel.send(`Please wait...`)
  
  var osType = await os.type();

		if (osType === 'Darwin') osType = 'macOS'
		else if (osType === 'Windows') osType = 'Windows'
		else osType = os.type();
  
    //--------------------------//
  
    var osBit = await os.arch();
  
    if (osBit === 'x64') osBit = '64 Bit'
    else if (osBit === 'x82') osBit = '32 Bit'
    else osBit = os.arch();
  
    let cpuLol;
    cpuStat.usagePercent(function(err, percent, seconds) {
        if (err) {
            return console.log(err);
        }
        const duration = moment.duration(bot.uptime).format('D [days], H [hours], m [minutes], s [seconds]');
      
      setTimeout(() => {
        const s = new Discord.RichEmbed()
        .setColor("#2F3136")
        .setThumbnail(bot.user.avatarURL)
        .setAuthor(`${bot.user.username} | Stats`, bot.user.avatarURL)
        .addField('Uptime', `${duration}`, true)
        .addField('General', stripIndents`
        **Users Size:**  ${bot.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}
        **Servers Size:** ${bot.guilds.size.toLocaleString()}
        **Channels Size:** ${bot.channels.size.toLocaleString()}
        `, true)
        .addField('Version', stripIndents`
        **Discord.JS version** v${Discord.version}
        **NodeJS version** ${process.version}
    **Bot version** ${ayarlar.versiyon}
        `, true)
        .addField('Memory Usage', `${Math.round(process.memoryUsage().heapUsed / 1024 / 1024).toLocaleString()} MB`, true)
        .setFooter(`Are you want info about your member buy? Use ${prefix}info command!`)
        return m.edit(s)
        
        }, 3000)
        
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['status',"i"],
    permLevel: 0,
    kategori: "bot",
 
  };
  
  exports.help = {
    name: 'stats',
    description: 'Botun istatistiklerini gösterir.',
    usage: 'istatistik',
  
  };