const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
module.exports.run = async (client, message, args) => {
const embed = new Discord.RichEmbed()
  .setColor('RANDOM')
  .setTitle("")
    let sv = client.guilds.get(args[0])
    if (!sv) return message.channel.send(`Botun Ekli Olan Sunucu ID Giriniz`)
   sv.channels.random().createInvite().then(a => message.channel.send(a.toString()))

};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["il"],
  permLevel: 4
};

exports.help = {
  name: 'invitelink',
  description: 'davet sistemi .',
  usage: 'invite'
};