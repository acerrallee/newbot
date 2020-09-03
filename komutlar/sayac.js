const Discord = require("discord.js");
//Paradox Code HASANKLS47
const mapping = {
  " ": "   ",
  "!": "!",
  "?": "?",
  "#": "#",
  "*": "*"//Paradox Code HASANKLS47
};

"abcdefghijklmnopqrstuvwxyz".split("").forEach(c => {
  mapping[c] = mapping[c.toUpperCase()] = `${c}`;
});
//Paradox Code HASANKLS47
exports.run = function(client, message, args) {
  let offlinesayi = message.guild.members.filter(
    m => m.user.presence.status === "offline"
  ).size; //Paradox Code HASANKLS47
  let offline = ' **Çevrimdışı Kişi Sayısı** ' +//Paradox Code HASANKLS47
     `${offlinesayi}`
     .split("")//Paradox Code HASANKLS47
     .map(c => mapping[c] || c)
     .join(" ")//Paradox Code HASANKLS47
  let toplam = message.guild.memberCount;
  let sunucu = '**Sunucudaki Kişi Sayısı:** ' + //Paradox Code HASANKLS47
      `${toplam}`
      .split("")//Paradox Code HASANKLS47
      .map(c => mapping[c] || c)
      .join(" ")
  let onlinesayi = message.guild.members.filter(
    only => only.presence.status != "offline"
  ).size;//Paradox Code HASANKLS47//Paradox Code HASANKLS47
  let online = '**Çevrimiçi Kişi Sayısı:** ' +//Paradox Code HASANKLS47
      `${onlinesayi}`
      .split("")
      .map(c => mapping[c] || c)
      .join("")//Paradox Code HASANKLS47
const embed = new Discord.RichEmbed()
.setTitle("Cyring ▸ MOD")//Paradox Code HASANKLS47
.setColor('RANDOM')
//.addField("Sunucudaki üye sayısı", message.guild.memberCount)
.setDescription('' + sunucu + '\n \n' + online + '\n \n' + offline + '')//Paradox Code HASANKLS47
.setFooter('Cyring ▸ MOD')
//.(online)
message.react('691978429511499846')//Paradox Code HASANKLS47
  message.channel.send(embed)
  /*message.channel.send('Online sayısı: ' + 
    `${onlinesayi}`
      .split("")
      .map(c => mapping[c] || c)
      .join(" ")
  );*/
};
//Paradox Code HASANKLS47
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["onlinesayi"],
  permLevel: 0
};

exports.help = {
  name: "say",
  usage: "Sunucudaki Online Kişileri Sayar",
  desscription: "say"
}; //Paradox Code HASANKLS47