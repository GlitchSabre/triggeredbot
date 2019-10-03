const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = '.';
const token = 'TOKEN_HERE';
const fs = require("fs")
const replaceExt = require('replace-ext');
//let warns = JSON.parse(fs.readFileSync("./warns.json","utf8"))
//let modules = JSON.parse(fs.readFileSynce("./modules.json","utf8"))

bot.on('ready', () =>{

    console.log('mainBot is Ready!');
    bot.user.setActivity('DONT TRIGGER ME'); 
    try{if(fs.existsSync('./commandbot.js')){tCommands=require('./commandbot.js')}}finally{}
    try{if(fs.existsSync('./musicbot.js')){tCommands=require('./musicbot.js')}}finally{}
    try{if(fs.existsSync('./oofbot.js')){tCommands=require('./oofbot.js')}}finally{}
 })
bot.login(token);


bot.on('message', msg =>{
    /*let args = msg.content.substring(prefix.length).split(" ");
    switch(args[0]){
        case 'enable':
                if(msg.member.roles.find("name","👑Owner") || msg.member.roles.find("name","🛠Moderator")){
                    let args = msg.content.substring(prefix.length).split(" ");
                    if(!args[1]) return msg.channel.send('```Specify the module to be enabled kid```')
                    if(args[1]!='musicbot' && args[1]!='oofbot' && args[1]!='commandbot') return msg.channel.send('```Specify a valid module```')
                    else{
                        try{if(fs.existsSync('./music.js')){
                            msg.channel.send('```Module already enabled```')}
                            
                        
                            else{
                                var path = `C:/Users/Sesh/Desktop/discordbot/${args[1]}.disabled`;
                                var newPath = replaceExt(path, '.js');
                                console.log(newPath)
                                //tModule = require(newPath)
                                //msg.channel.send(`✅ Enabled ${args[1]} module!`)
                            }  
                        }
                        finally{}
                    }
                    

                }
                else{msg.channel.send('```You aint got perms kid```')}
        break;
    }*/
})
