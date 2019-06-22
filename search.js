const Discord = require('discord.js');
const prefix = '.';
const token = 'NTgxMDEwNDI5MDAyNzc2NTc4.XOZXzg.LQJuzha9NngU_1IieNUxEGKpejs';
//const search = require(`yt-search`);
const YouTube = require("discord-youtube-api");
 
const youtube = new YouTube("AIzaSyCSUsVlKvlK5QkLpTq-sIpRmSJ_GZiEwHQ");

const client = new Discord.Client();

client.login(token);

client.on('ready', () =>{
    console.log('search is ready!');
    
})

client.on('message', msg =>{
    if(msg.channel.name === 'dj-commands'){
        if(msg.content.startsWith(`${prefix}search`)){
            var keywords = msg.content.substr(msg.content.indexOf(" ")+1);
            const Guild = msg.guild.id
            search(keywords,Guild);
        }
    }
})

async function search(key,guild){
    const video = await youtube.searchVideos(key);

    //const message = `.play ${video.url}`

    

    const song ={
        url: video.url
    };

   let File = require(`./music.js`);

   File.play(guild, song)


    
}