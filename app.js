//FUCK OFF WOLFIE
const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {

  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

  client.user.setActivity(`FiverX ESports`);
});

client.on("guildCreate", guild => {

  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`FiverX ESports`);
});

client.on("guildDelete", guild => {

  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setActivity(`FiverX ESports`);
});


client.on("message", async message => {

  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "ping") {

    const m = await message.channel.send("Ping Sent.");
    m.edit(`Ping recieved! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(O_o=>{});
    message.channel.send(sayMessage);
  }

  if(command === "kick") {

    if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
      return message.reply("You are not a member of the staff team! Request denied.");

    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!member)
      return message.reply("That member could not be found.");
    if(!member.kickable)
      return message.reply("This user cannot be kicked.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason was provided.";

    await member.kick(reason)
      .catch(error => message.reply(`My apologies, ${message.author}. I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag} because of the following reason: ${reason}`);

  }

  if(command === "clan") {
  message.channel.send('FVX | FiverX ESports')
  }

  if(command === "bot") {
  message.channel.send('FVX°B0KNU')
  }

  if(command === "rules") {
    message.channel.send({embed: {
    color: 3447003,
    author: {
      name: 'Rules:',
      icon_url: client.user.avatarURL
    },
    fields: [{
        name: "Trashtalk",
        value: "Just Trashtalk for fun."
      },
      {
        name: "Spy",
        value: "We dont need spy for this server."
      },
      {
        name: "Impersonation",
        value: "No impersonation of any clan member in any way."
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "FiverX Esports",
    }
  }
});
  }

  if(command === "help") {
    message.channel.send({embed: {
    color: 3447003,
    author: {
      name: "Commands List | Prefix: /",
      icon_url: client.user.avatarURL
    },
    fields: [{
        name: "ping",
        value: "Test latency."
      },
      {
        name: "kick",
        value: "Kicks the specified member from the server."
      },
      {
        name: "ban",
        value: "Bans the specified member from the server."
      },
      {
        name: "clan",
        value: "What is the clan?."
      },
      {
        name: "bot",
        value: "Posts about the Bot."
      },
      {
        name: "rules",
        value: "Posts list of rules."
      },
      {
        name: "say",
        value: "Echoes what is said."
      },
      {
        name: "purge",
        value: "Bulk deletes number of messages."
      }
    ],
    timestamp: new Date(),
    footer: {
      icon_url: client.user.avatarURL,
      text: "FiverX ESports",
    }
  }
});
  }


  if(command === "ban") {

    if(!message.member.roles.some(r=>["Staff"].includes(r.name)) )
      return message.reply("You are not a member of the staff team! Request denied.");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("That member could not be found.");
    if(!member.bannable)
      return message.reply("This user cannot be banned.");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason has been provided.";

    await member.ban(reason)
      .catch(error => message.reply(`My apologies, ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because of the following reason: ${reason}`);
  }

  if(command === "purge") {

    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
});

client.login(process.env.BOT_TOKEN);
