const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

exports.run = (client, message, args) => {
  let mesaj = args.slice(0).join(' ');
if(mesaj.length < 1) return message.channel.send(new Discord.RichEmbed().setDescription(`Herkese mesaj göndere bilmem için önce mesajını yazman lazım.`).setColor('BLACK'));
  message.delete();
      const mesajat = new Discord.RichEmbed()
      .setColor('BLACK')
      .setDescription('' + mesaj + '')

      client.users.forEach(u => {
u.sendEmbed(mesajat)
})
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['dd','dmd','dm'],
  permLevel: 4
};

exports.help = {
  name: 'dmduyuru',
  description: 'Tüm Herkese Mesaj Atar.',
  usage: '*dmduyuru [duyurmak istediğiniz şey]'
};