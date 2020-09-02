const Discord = require('discord.js')
const db = require('quick.db');
var ayarlar = require('../ayarlar.json');



exports.run = async (client, message, args) => {
let all = db.all().filter(i => i.ID.startsWith('sunucubul_'))
for (const i of all) db.delete(i.ID)
message.reply('Resetted.')
}


          
    
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['resetsw', 'serversreset', 'serverreset', 'swreset'],
    permLevel: 4,
    katagori: "Ekonomi"
}
exports.help = {
    name: 'resetservers',
    description: 'Hesabınızdan başka bir hesaba para transferi yaparsınız.',
    usage: 'transfer <@kullanıcı>',
}
