const Discord = require("discord.js");
const db = require("quick.db");

exports.run = async(client, message, args) => {

const yetkiyokknks = new Discord.RichEmbed()
.setColor("BLACK")
.setDescription(`Bu Komutu Kullanmak İçin Yeterli İzine Sahip Değilsin!`,)

if (!message.member.hasPermission ("ADMINISTRATOR"))
return message.channel.send(yetkiyokknks)

  const bsii = new Discord.RichEmbed()
  .setColor("BLACK")
  .setDescription("Ne Yapmak İstiyorsun?\!otorol sıfırla veya !otorol ayarla @Rol",)
  
if(args.slice(0).join(" ").length < 1) 
  message.channel.send(bsii)
  
if(args[0] == "ayarla") {
  
var otorolrol = message.mentions.roles.first()

const roldeetiketlesene = new Discord.RichEmbed()
.setColor("BLACK")
.setDescription(`Bir Rol Etiketlemelisin!`,)

if (!otorolrol)
return message.channel.send(roldeetiketlesene)

db.set(`alphaotorol${message.guild.id}`, otorolrol)

const tmmknkshadibb = new Discord.RichEmbed()
.setColor("BLACK")
.setDescription(`Belirtilen Rol Başarıyla Ayarlandı!`,)

message.channel.send(tmmknkshadibb)
                        
return

};

  if(args[0] == "sıfırla") {
    
    db.delete(`alphaotorol${message.guild.id}`)
    
  const ram = new Discord.RichEmbed()
  .setColor("BLACk")
  .setDescription(`Otorol Başarıyla Sıfırlandı!`,)
  
  message.channel.send(ram)
    
  }
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["otorol", "oto-rol"],
    perm: 0
};

exports.help = {
    name: "Otorol",
    description: "Otorolü Ayarlar",
    usage: "/otorol ayarla @rol/sıfırla"
};