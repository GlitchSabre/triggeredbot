const Discord = require('discord.js');
const bot = new Discord.Client();
const token = 'TOKEN_HERE';
const oof = '```Stop oofing,kid```'
const smh = '```Kid wanna get kicked? No smh```'
bot.on('ready', () =>{

    console.log('oofBot is Ready!');
     })
bot.login(token);

bot.on('message', msg =>{
    if(msg.author.username === 'Triggered' && msg.author.id === '581010429002776578'){

    }   
    else{
        if(msg.content === "^"){
            msg.channel.send('```Dont be lazy kid. Type again```');
        }
        if(msg.content === "o o f"){
            msg.channel.send(oof);
        }
        if(msg.content === "ooof"){
            msg.channel.send(oof);
        }
        if(msg.content === "s m h"){
            msg.channel.send(smh);
        }
        if(msg.content === "Smh"){
            msg.channel.send(smh);
        }
        if(msg.content === "Anyone on?"){
            msg.channel.send('```I am always watching```');
            msg.channel.send('https://tenor.com/view/sesame-street-gif-6118880');
        }
        if(msg.content === "anyone on?"){
            msg.channel.send('```I am always watching```');
            msg.channel.send('https://tenor.com/view/sesame-street-gif-6118880');
        }
        if(msg.content.indexOf("Trump") > -1){
            msg.channel.send('`Dont take my name unnecessarily, kid.`');
        }
        if(msg.content.indexOf("trump") > -1){
            msg.channel.send('```Dont take my name unnecessarily, kid.```');
        }
        if(msg.content.indexOf("gr8") > -1){
            msg.channel.send('```No Sarcasm, kid```');
        }
        if(msg.content.indexOf("Gr8") > -1){
            msg.channel.send('```No Sarcasm, kid```');
        }
        if(msg.content.indexOf("oof") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("Oof") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("OOF") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("oOf") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("ooF") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("OoF") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("OOf") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("00f") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("00F") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("0of") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("o0f") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("0Of") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("0OF") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("O0f") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("O0F") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("𝗼𝗼𝗳") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("oofu") > -1){
            msg.channel.send(oof);
        }
        if(msg.content.indexOf("smh") > -1){
            msg.channel.send(smh);
        }
        if(msg.content.indexOf("lmao") > -1){
            
            msg.channel.send('```Dont laugh like a kid. Oh I forgot....```');
            msg.channel.send('<:hehe:581058091722997760>');
        }
        if(msg.content.indexOf("Lmao") > -1){
            
            msg.channel.send('```Dont laugh like a kid. Oh I forgot....```');
            msg.channel.send('<:hehe:581058091722997760>');
        }
        if(msg.content === "no" ){
            msg.channel.send('```Give me a NO and youre fired kid```');
        }
        
    }
    
    
})

