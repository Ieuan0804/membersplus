const Discord = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');



exports.run = async (client, message, args) => {

    let all = db.all().filter(i => i.ID.startsWith('uyealim_'))
    message.reply(`Şu ana kadar toplam **${all.length}** alım gerçekleşti.`)
       
}


          
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['totaladvertise', 'totalbuy', 'toplamalim', 'alımlar', 'alimlar'],
    permLevel: 4,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'totalads',
    description: 'Hesabınızdan başka bir hesaba para transferi yaparsınız.',
    usage: 'transfer <@kullanıcı>',
}
