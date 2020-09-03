const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require("quick.db")
require('./util/eventLoader')(client);
const YouTube = require('simple-youtube-api');
const queue = new Map(); 
const http = require('http');
const express = require('express');
const server = express();


var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};




client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//Reklam-Engel//
client.on("message", async message => {
  let reklamengel = await db.fetch(`reklame_${message.guild.id}`);

  let reklamkick = await db.fetch(`reklamk_${message.guild.id}`);
  let sa = message.member;
  if (!reklamengel) return;
  else {
    const reklamlar = [
      "discord.app",
      "discord.gg",
      "https",
      ".com",
      "www.",
      "http",
      ".net",
      ".io",
      ".pw",
      ".gg",
      ".com.tr",
      ".org",
      ".biz",
      ".party",
      ".rf.gd",
      ".az"
    ];
    if (reklamlar.some(a => message.content.toLowerCase().includes(a))) {
      if (message.member.hasPermission("BAN_MEMBERS")) return;
      else {
      if (!reklamkick) {
        message.delete();
        message.member.send("**Please don't advertise!!**");
        message.channel.send(`<@${sa.id}> **Please don't advertise!**`);
        return;
      } else {
        message.delete();
        db.add(`reklamyap_${message.guild.id}_${message.member.id}`, +1);
        let reklama = await db.fetch(
          `reklamyap_${message.guild.id}_${message.member.id}`
        );
        if (reklama == "3") {
          const embed = new Discord.RichEmbed()
            .setDescription(
              `<@${sa.id}> **Please don't advertise!!** (${reklama}/3)`
            )
            .setColor("BLACK");
          message.channel.send(embed);
          db.delete(`reklamyap_${message.guild.id}_${message.member.id}`);
          message.member.send("**Please don't advertise!!**");
          sa.kick();
          return;
        }
        const embed = new Discord.RichEmbed()
          .setDescription(
            `<@${sa.id}> **Please don't advertise!!** (${reklama}/3)`
          )
          .setColor("RANDOM")
        message.channel.send(embed);
        message.member.send("**Please don't advertise!!**")
        return;
        }
      }
    }
  }
});
//Reklam-Engel Bitiş//

//gelen-giden
client.on("guildMemberAdd", member => {
 let gelengiden = JSON.parse(fs.readFileSync('./ayarlar/gelengiden.json', 'utf8'));
  var asd = db.fetch(`hgbb_${member.guild.id}`)
     let guild = member.guild;
       var Durum = member.user.presence.status;
        var Durm = (Durum == "online" ? (0x00AE86) : (Durum == "offline" ? (0x808080) : (Durum == "idle" ? (0xFFFF00) : (Durum == "dnd" ? (0xFF0000) : (0x00AE86)))))
        var durm = (Durum == "online" ? ("Çevrimiçi", `Çevrimiçi`) : (Durum == "offline" ? ("Çevrimdışı", `Çevrimdışı`) : (Durum == "idle" ? ("Boşta", `<Boşta`) : (Durum == "dnd" ? ("Rahatsız Etmeyin", `Rahatsız Etme`) : ("Bilinmiyor/bulunamadı.")))))
  const channel = member.guild.channels.find("id", asd.id);
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("BLACK")  
    .setTitle(`Hoş geldin ${member.user.username} Senin ile ${member.guild.memberCount} üyeye ulaştık!`)
    .setDescription(`**<#741590582148726816> kanalından kurallarımızı okumayı unutma.**`)
  
  channel.send(embed);
  
});



//Otorol
client.on("guildMemberAdd", member => {

let otorolrolu = db.fetch(`alphaotorol${member.guild.id}`)

if (!otorolrolu)
  return;

const roll = otorolrolu.id

if(!roll)
  return;

member.addRole(roll)


});