const Discord = require('discord.js');


exports.run = function(client, message) {
const embed = new Discord.RichEmbed()
.setColor('RANDOM')
.setTitle('Cyring Bot Yardım Menüsü')
.setTimestamp()
.addField('📙 Komutlar **[10]**', '``-ban``, ``-dm``, ``-kick``, ``-mute``, ``-otorol``, ``-temizle``, ``-unban``, ``-hg``, ``-say``')
.setFooter('Cyring ▸ MOD', client.user.avatarURL)
.setTimestamp()
message.channel.send(embed)
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [], 
  permLevel: 0 
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım'
};
 