const ytdl = require('ytdl-core');
const prefix = 'o1';
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NTgxMDEwNDI5MDAyNzc2NTc4.XOZXzg.LQJuzha9NngU_1IieNUxEGKpejs';
const opus = require('opusscript');
const active = new Map();

bot.on('ready', () =>{

    console.log('play is Ready!');})

bot.login(token);

bot.on('message', msg =>{
    if(msg.channel.name === 'dj-commands'){
    let args = msg.content.substring(prefix.length).split(" ");
    let ops = {active: active};

    switch(args[0]){
        case 'play':
            exports.run(msg,args,ops)
        break;
        case 'stop':
            msg.guild.me.voiceChannel.leave();
            msg.channel.send('```Thanks for saving my throat kid```');
        break;
    }
}})

    
exports.run = async(message,args,ops) =>{    
    if(!message.member.voiceChannel) return message.channel.send('```First join a goddamn channel kid```');
    
    //if(message.guild.me.voiceChannel) return message.channel.send('```Dont you see I am busy kid```');
    
    if(!args[1]) return message.channel.send('```Oof kid. Enter a URL```');

    let validate = await ytdl.validateURL(args[1]);

    if(!validate) return message.channel.send('```Dont fool me with fake URLs kid```');

    let info = await ytdl.getInfo(args[1]);

    let data = ops.active.get(message.guild.id) || {};

    if(!data.connection) data.connection = await message.member.voiceChannel.join();

    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[1],
        announceChannel: message.channel.id
    });

    if(!data.dispatcher) play(bot,ops,data);
    else{
        message.channel.send(`<:check:581745359341092874>Added to Queue: ${info.title}|Requested by ${message.author.id}`);
        
    }
    ops.active.set(message.guild.id,data);
}

async function play(bot,ops,data){
    bot.channel.get(data.queue[0].announceChannel).send(`Now Playing: ${data.queue[0].songTitle}|Requested by ${data.queue[0].requester}`);

    let dispatcher = await connection.playStream(ytdl(data.queue[0].url, {filter : 'audioonly'}));

    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('finish', function(){
        end(bot,ops,this);
    })
}

function end(bot,ops,dispatcher){
    let fetched = ops.active.get(dispatcher.guildID);

    fetched.queue.shift();

    if(fetched.queue.lenth > 0){
        ops.active.set(dispatcher.guildID, fetched);

        play(bot,ops,fetched);
    }
    else{
        ops.active.delete(dispatcher.guildID);
        msg.guild.me.voiceChannel.leave();

        
    }
}