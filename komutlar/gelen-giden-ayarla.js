  const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs')

exports.run = (client, message, params, args, member) => {
  let gelengiden = JSON.parse(fs.readFileSync('./ayarlar/gelengiden.json', 'utf8'));
  var asd = message.mentions.channels.first()
  
      if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new Discord.RichEmbed().setDescription(`Üzgünüm Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!`).setColor('BLACK'))
if(!asd) return message.channel.send(new Discord.RichEmbed().setDescription("Gelen-Giden'i Ayarlamak İçin Bir Kanal Etiketlemelisin!").setColor('BLACK'))
    db.set(`hgbb_${message.guild.id}`, asd)
    message.channel.send(new Discord.RichEmbed().setDescription("Gelen-Giden Kanal'ı Başarıyla Ayarlandı!").setColor('BLACK'))
}  
exports.conf = {
  enable: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
}
exports.help = {
  name: "hg"
}