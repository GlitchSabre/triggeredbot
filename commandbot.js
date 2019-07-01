const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '.';
const token = 'NTgxMDEwNDI5MDAyNzc2NTc4.XOZXzg.LQJuzha9NngU_1IieNUxEGKpejs';
const fs = require("fs")
let warns = JSON.parse(fs.readFileSync("./warns.json","utf8"))

bot.on('ready', () =>{

    console.log('commmands are Ready!');
 })
bot.login(token);

bot.on('message', msg => {
    if (msg.channel.type === 'dm') return;
else{let args = msg.content.substring(prefix.length).split(" ");
    switch(args[0]){
        case 'announce':
            announce(msg)
        break;

        case 'kick':
                if(msg.member.roles.find("name","👑Owner") || msg.member.roles.find("name","🛠Moderator")){
                    let args = msg.content.substring(prefix.length).split(" ");
                    if(!args[1]) return msg.channel.send('```Specify a person kid```')
                    let kUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]));
                    if(!kUser) return msg.channel.send('```Give me a fake user and youre done kid```');
                    if(kUser.hasPermission('MOVE_MEMBERS')) return msg.channel.send('```Dont try to kick my man kid```')
                    let kReason = args.join(" ").slice(26);
                    if(!kReason) return msg.channel.send('```Specify a reason kid```')
                    let kickEmbed = new Discord.RichEmbed()
                        .setDescription("**KICK**")
                        .setColor("#d86624")
                        .addField("Get outta here kid",`${kUser}, ID: ${kUser.id}`)
                        .addField("Kicked by",`<@${msg.author.id}>`)
                        .addField("Reason:", `${kReason}`)
                        
                        
                    msg.guild.member(kUser).kick(kReason);
                    msg.guild.channels.find("name","announcements").send(kickEmbed)
                    
                    
                    
                }
                else{msg.channel.send('```You aint got perms kid```')}
        break;
        case 'ban':
                if(msg.member.roles.find("name","👑Owner") || msg.member.roles.find("name","🛠Moderator")){
                    let args = msg.content.substring(prefix.length).split(" ");
                    if(!args[1]) return msg.channel.send('```Specify a person kid```')
                    let bUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]));
                    if(!bUser) return msg.channel.send('```Give me a fake user and youre done kid```');
                    if(bUser.hasPermission('MOVE_MEMBERS')) return msg.channel.send('```Dont try to ban my man kid```')
                    let bReason = args.join(" ").slice(26);
                    if(!bReason) return msg.channel.send('```Specify a reason kid```')
                    let banEmbed = new Discord.RichEmbed()
                        .setDescription("**BAN**")
                        .setColor("#aa0808")
                        .addField("Never see ya again kid",`${bUser}, ID: ${bUser.id}`)
                        .addField("Banned by",`<@${msg.author.id}>`)
                        .addField("Reason:", `${bReason}`)
                        
                        
                    msg.guild.member(bUser).ban(bReason);
                    msg.guild.channels.find("name","announcements").send(banEmbed)
                    
                    
                    
                }
                else{msg.channel.send('```You aint got perms kid```')}
        break;
        case 'unban':
            unban(msg)
        break;
        case 'purge':
            if(msg.member.roles.find("name","👑Owner") || msg.member.roles.find("name","🛠Moderator")){
                let args = msg.content.substring(prefix.length).split(" ");
                if(!args[1]) return msg.channel.send('```Specify No.of messages to be purged kid```')
                if(args[1]>250 || args[1]<0) return msg.channel.send('```Select amount between 0 and 250```')
                if(isNaN(args[1]) === true) return msg.channel.send('```Enter a valid number son```')
                msg.channel.bulkDelete(args[1])
                msg.channel.send(`✅ Purged ${args[1]} messages`)
            }
            else{msg.channel.send('```You aint got perms kid```')}
        break;
        case 'mute':
                if(msg.member.roles.find("name","👑Owner") || msg.member.roles.find("name","🛠Moderator")){
                    let args = msg.content.substring(prefix.length).split(" ");
                    if(!args[1]) return msg.channel.send('```Specify the person to be muted kid```')
                    let mUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[1]));
                    if(!mUser) return msg.channel.send('```Give me a fake user and youre done kid```');
                    if(mUser.hasPermission('MOVE_MEMBERS')) return msg.channel.send('```Dont try to mute my man kid```')
                    let muted = msg.guild.roles.find("name","🔇Muted")
                    if(mUser.roles.find("name","🔇Muted")) return msg.channel.send(`<@${mUser.id}> is already muted!`)
                    mUser.addRole(muted)
                    msg.channel.send(`✅ Muted <@${mUser.id}>`)

                }
                else{msg.channel.send('```You aint got perms kid```')}
        break;
        case 'unmute':
                if(msg.member.roles.find("name","👑Owner") || msg.member.roles.find("name","🛠Moderator")){
                    let args = msg.content.substring(prefix.length).split(" ");
                    if(!args[1]) return msg.channel.send('```Specify the person to be unmuted kid```')
                    let mUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
                    if(!mUser) return msg.channel.send('```Give me a fake user and youre done kid```');
                    let muted = msg.guild.roles.find("name","🔇Muted")
                    if(!mUser.roles.find("name","🔇Muted")) return msg.channel.send(`<@${mUser.id}> is already unmuted!`)
                    mUser.removeRole(muted)
                    msg.channel.send(`✅ Unmuted <@${mUser.id}>`)

                }
                else{msg.channel.send('```You aint got perms kid```')}
        break;
        case 'warn':
            warn(msg); 
        break;
        case 'unwarn':
            unwarn(msg); 
        break;
        case 'help':
            let helpEmbed = new Discord.RichEmbed()
            .setTitle("**HELP**")
            .setColor("#04def2")
            .addField("INFO",`I am <@581010429002776578>.\nI can help you while you enjoy your stay at TheGamingFam.\nI am created and owned by <@457207642335477761>`)
            .addField("COMMANDS",'These are only for the Owner and Moderators.\n`.kick`|`.ban`|`.unban`|`.mute`|`.unmute`|`.purge`')
            .addField("MUSIC",'`.play`|`.search`|`.skip`|`.stop`|`.leave`')
            .addField("FUN",'Commands to be added')
            .addField(`Have fun using my services,`, `${msg.author}`)
            msg.channel.send(helpEmbed)
        break;
}}})

bot.on('guildMemberAdd', member =>{
    let gamer = member.guild.roles.find("name","🎮Gamer")
    member.addRole(gamer)
    let channel = member.guild.channels.find("name","welcome");
    let joinEmbed = new Discord.RichEmbed()
    .setTitle("**WELCOME**")
    .setColor("#23d8ba")
    .setDescription(`Welcome to TheGamingFam, <@${member.id}>! Game hard and have fun while following the rules.

    Rules:
    
    1. Be loyal and don't torture Admins/Mods.
    2. Don't swear
    3. Don't spam
    4. Ask for available bot commands
    5. Music commands only in dj-commands
    6. Anything that will annoy the Admins/Mods will get you kicked
    
    Server owned by <@457207642335477761>`)
    channel.send(joinEmbed)


})

async function unban(msg){
    if(msg.member.roles.find("name","👑Owner") || msg.member.roles.find("name","🛠Moderator")){
        
        let args = msg.content.substring(prefix.length).split(" ");

        if(!args[1]) return msg.channel.send('```Specify a person kid```')
        
        let uUser = await bot.fetchUser(args[1])
        
        if(!uUser) return msg.channel.send('```Give me a fake user and youre done kid```');
        
        let uReason = args.join(" ").slice(25);
        if(!uReason) return msg.channel.send('```Specify a reason kid```')
        let unbanEmbed = new Discord.RichEmbed()
            .setDescription("**UNBAN**")
            .setColor("#05b227")
            .addField("Come back son",`${uUser}, ID: ${uUser.id}`)
            .addField("Unbanned by",`<@${msg.author.id}>`)
            .addField("Reason:", `${uReason}`)
            
            
        msg.guild.unban(uUser);
        msg.guild.channels.find("name","announcements").send(unbanEmbed)
        
        
        
    }
    
}

async function warn(msg){
    if(msg.member.roles.find("name","👑Owner") || msg.member.roles.find("name","🛠Moderator")){
        let args = msg.content.substring(prefix.length).split(" ");
        if(!args[1]) return msg.channel.send('```Specify a person kid```')
        let wUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        if(!wUser) return msg.channel.send('```Give me a fake user and youre done kid```')
        if(wUser.hasPermission('MOVE_MEMBERS')) return msg.channel.send('```Dont try to warn my man kid```')
        if(!warns[wUser.id] || warns[wUser.id] === 0){
            warns[wUser.id] = 1;
            fs.writeFile('./warns.json', JSON.stringify(warns), (err) => {
                if(err) console.log(err)
            });
            msg.channel.send(`<@${wUser.id}> has 1/5 warns. Be careful`)
        }
        else{
            warns[wUser.id]++;
            fs.writeFile('./warns.json', JSON.stringify(warns), (err) => {
                if(err) console.log(err)
            });
            if(warns[wUser.id]<5){
                msg.channel.send(`<@${wUser.id}> has ${warns[wUser.id]}/5 warns. Be careful`)
            }
            else{
                msg.channel.send(`<@${wUser.id}> has 5/5 warnings and will be kicked`)
                let kickEmbed = new Discord.RichEmbed()
                .setDescription("**KICK**")
                .setColor("#d86624")
                .addField("Get outta here kid",`${wUser}, ID: ${wUser.id}`)
                .addField("Kicked by",`<@${msg.author.id}>`)
                .addField("Reason:", `5/5 Warnings`)
            
            
                msg.guild.member(wUser).kick(`5/5 Warnings`);
                msg.guild.channels.find("name","announcements").send(kickEmbed)

            }
        }
    }
    else{msg.channel.send('```You aint got perms kid```')}
}

async function unwarn(msg){
    if(msg.member.roles.find("name","👑Owner") || msg.member.roles.find("name","🛠Moderator")){
        let args = msg.content.substring(prefix.length).split(" ");
        if(!args[1]) return msg.channel.send('```Specify a person kid```')
        let wUser = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
        if(!wUser) return msg.channel.send('```Give me a fake user and youre done kid```');
        if(!warns[wUser.id] || warns[wUser.id] === 0){
            warns[wUser.id] = 0;
            fs.writeFile('./warns.json', JSON.stringify(warns), (err) => {
                if(err) console.log(err)
            });
            msg.channel.send(`<@${wUser.id}> has no warns to be removed`)
        }
        else{
            warns[wUser.id]--;
            fs.writeFile('./warns.json', JSON.stringify(warns), (err) => {
                if(err) console.log(err)
            });
            msg.channel.send(`<@${wUser.id}> has ${warns[wUser.id]}/5 warns now. 1 warn was removed`)
        }
    }   
    else{msg.channel.send('```You aint got perms kid```')}
}

async function announce(msg){
    const filter = m => m.content.isNaN
    const collector = msg.channel.createMessageCollector(filter, { time: 60000 });
    
    let announceEmbed = new Discord.RichEmbed
    .setTitle(`**ANNOUNCEMENT**`)
    .setDescription(collector)
    
    msg.guild.channels.find("name","announcements").send(announceEmbed)
}    
    
    
