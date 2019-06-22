const ytdl = require('ytdl-core');
const prefix = 'o1';
const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'NTgxMDEwNDI5MDAyNzc2NTc4.XOZXzg.LQJuzha9NngU_1IieNUxEGKpejs';
const opus = require('opusscript');
const active = new Map();
let ops = {active:active}

bot.login(token);

bot.on('message', msg =>{
    if(msg.channel.name === 'dj-commands'){
    let args = msg.content.substring(prefix.length).split(" ");

    switch(args[0]){
        case 'play':
            exports.run(msg,args)
        break;
        case 'stop':
            msg.guild.me.voiceChannel.leave();
            msg.channel.send('```Thanks for saving my throat kid```');
        break;
    }
}})

exports.run = async(message,args,ops) =>{
    if(!message.member.voiceChannel) return message.channel.send('```First join a goddamn channel kid```');
    
    if(message.guild.me.voiceChannel) return message.channel.send('```Dont you see I am busy kid```');
    
    if(!args[1]) return message.channel.send('```Oof kid. Enter a URL```');

    let validate = await ytdl.validateURL(args[1]);

    if(!validate) return message.channel.send('```Dont fool me with fake URLs kid```');

    let info = await ytdl.getInfo(args[1]);

    let connection = await message.member.voiceChannel.join();

    let dispatcher = await connection.playStream(ytdl(args[1], {filter : 'audioonly'}));

    message.channel.send(`<:check:581745359341092874> Now playing: ${info.title}`);

      
}