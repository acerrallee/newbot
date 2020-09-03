const Discord = require("discord.js")

exports.run = async(client, message, args) => {
  
  const yetkinyok = new Discord.RichEmbed()
  .setColor("BLACK")
  .setDescription(`Üzgünüm Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!`,)
  
  if (!message.member.hasPermission ("MANAGE_MESSAGES"))
    return message.channel.send(yetkinyok)
  
  var yazi = args.slice(0).join(" ")
  
  const birseyyaz = new Discord.RichEmbed()
  .setColor("BLACK")
  .setDescription(`Yazmam İçin Bir Şey Belirtmelisin!`, message.author.avatarURL)
  
  if (!yazi)
    return message.channel.send(birseyyaz)
  
  const mesaj = new Discord.RichEmbed()
  .setColor("BLACK")
  .setTitle(`**Cyring Duyuru**`)
  .setDescription(`${yazi}`)
  
  message.delete()
  message.channel.send(mesaj)
  
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["duyuru"],
  perm: 0
}

exports.help = {
  name: "duyuru",
  description: "Bota Mesaj Yazdırır.",
  usage: "+yaz (Yazı)"
}