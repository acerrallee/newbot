const Discord = require("discord.js");
exports.run = function(client, message, args) {
  if (!message.member.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(`Ne yazıkki bu komutu kullanmaya yetkiniz yok!`)

    message.channel.send(embed);
    return;
  }
  if (!args[0]) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(`Lütfen silinecek mesaj sayısını belirtiniz.`)

    message.channel.send(embed);
    return;
  }
  if (args[0] > 100) {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .setDescription(`Ne yazık ki 100'den fazla mesaj silemem.`)

    message.channel.send(embed);
    return;
  }
  message.channel.bulkDelete(args[0]).then(() => {
    const embed = new Discord.RichEmbed()
      .setColor("BLACK")
      .addField(`Temizleyen Yetkili`, `<@${message.author.id}>`)
      .addField(`Silinen Mesaj Sayısı`, args[0])

    message.channel.send(embed).then(msg => msg.delete(5000));
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sil"],
  permLevel: 0
};

exports.help = {
  name: "temizle",
  description: "temizle",
  usage: "temizle"
};