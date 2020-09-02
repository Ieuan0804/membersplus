const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
module.exports = message => {
  if (!message.guild) return;
  let prefix = db.fetch(`prefix_${message.guild.id}`) || "+"
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let perms = client.elevation(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    if (db.has(`blacklist_${message.author.id}`)) return;
    if (message.guild.id == "734807138526036079" && message.channel.id != "734818248880685138" && message.channel.id != "735196236994576414") {
      message.delete()
      return message.reply('You can use the bot only in <#734818248880685138> channel in this server!').then(msg => msg.delete(7500))
    }
    if (!db.has(`blacklist_${message.author.id}`)) cmd.run(client, message, params, perms);
  }

};
