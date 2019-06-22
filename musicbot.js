const Discord = require('discord.js');
const prefix = '.';
const token = 'NTgxMDEwNDI5MDAyNzc2NTc4.XOZXzg.LQJuzha9NngU_1IieNUxEGKpejs';
const ytdl = require('ytdl-core');
//const YouTube = require("discord-youtube-api");
 
//const youtube = new YouTube("AIzaSyCSUsVlKvlK5QkLpTq-sIpRmSJ_GZiEwHQ");

const client = new Discord.Client();

const queue = new Map();

const ytsearch = require('yt-search')



client.login(token);

client.once('ready', () => {
	console.log('musicBot is Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	//console.log(message.channel.name);
	if (message.channel.type === 'dm') return;
else{   if(message.channel.name === 'dj-commands'){
        if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	const serverQueue = queue.get(message.guild.id);

	if (message.content.startsWith(`${prefix}play`)) {
		var keywords = message.content.substr(message.content.indexOf(" ")+1);
        const Guild = message.guild.id
        const serverQueue = queue.get(Guild);
		play2(keywords,message,serverQueue);
		return;
	}if (message.content.startsWith(`${prefix}skip`)) {
        //console.log(serverQueue.songs);
        skip(message, serverQueue);
		return;
	} else if (message.content.startsWith(`${prefix}stop`)) {
		stop(message, serverQueue);
        return;
     
    } 
    else if(message.content.startsWith(`${prefix}search`)){
        var keywords = message.content.substr(message.content.indexOf(" ")+1);
        const Guild = message.guild.id
        const serverQueue = queue.get(Guild);
        //const voiceChannel = message.member.voiceChannel
		//const channel = message.channel
		//const collector = message.channel.createCollector()
        search(keywords,message,serverQueue);
        return;
    }
    /*else if(message.content.startsWith(`${prefix}leave`)){
        message.guild.me.leave();

    }*/
    else {
		
	}
    }
	
}} )


async function execute(message, serverQueue,dur) {
	const args = message.content.split(' ');

	const voiceChannel = message.member.voiceChannel;
	if (!voiceChannel) return message.channel.send('```Join a goddamn channel kid```');
	/*const permissions = voiceChannel.permissionsFor(message.client.user);
	if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
		return message.channel.send('Oof kid. First give me perms');
	}*/

	const songInfo = await ytdl.getInfo(args[1]);
	//console.log(songInfo)
	const urlimg = songInfo.video_url.slice(32);
	const song = {
		title: songInfo.title,
		url: songInfo.video_url,
		duration: dur,
		img: urlimg
	};
	//console.log(song.url)

	if (!serverQueue) {
		const queueContruct = {
			textChannel: message.channel,
			voiceChannel: voiceChannel,
			connection: null,
			songs: [],
			volume: 5,
			playing: true,
		};

		queue.set(message.guild.id, queueContruct);

		queueContruct.songs.push(song);

		try {
			var connection = await voiceChannel.join();
			queueContruct.connection = connection;
			play(message.guild, queueContruct.songs[0], message);
		} catch (err) {
			console.log(err);
			queue.delete(message.guild.id);
			return message.channel.send(err);
		}
	} else {
		serverQueue.songs.push(song);
		//console.log(serverQueue.songs.length);
		let img = `https://img.youtube.com/vi/${song.img}/mqdefault.jpg`
		let queueEmbed = new Discord.RichEmbed()
		.setTitle('**Queued**')
		.setColor("#f4e542")
		.setThumbnail(img)
		.setDescription(`[${song.title}](${song.url})`)
		.setFooter(`In at ${serverQueue.songs.length}`)
		return message.channel.send(queueEmbed);
	}

}


function skip(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('```First join my channel kid```');
	if (!serverQueue) return message.channel.send('```There are no songs to skip son```');
	message.channel.send(`✅ Sucessfully skipped ${serverQueue.songs[0].title}`)
	serverQueue.connection.dispatcher.end();
    //console.log(serverQueue.songs);
    
}

function stop(message, serverQueue) {
	if (!message.member.voiceChannel) return message.channel.send('```First join my channel kid```');
	serverQueue.songs = [];
    serverQueue.connection.dispatcher.end();
    message.channel.send('```Thanks for saving my throat kid```');
}

function play(guild, song, msg) {
	const serverQueue = queue.get(guild.id);

	if (!song) {
		serverQueue.voiceChannel.leave();
		queue.delete(guild.id);
		msg.channel.send(`✅ Finished playing songs and left voiceChannel`)
		return;
	}

    if(serverQueue.songs[0] != `undefined`){
		let img = `https://img.youtube.com/vi/${song.img}/mqdefault.jpg`
		let queueEmbed = new Discord.RichEmbed()
		.setTitle('**Now Playing**')
		.setColor("#f4e542")
		.setThumbnail(img)
		.setDescription(`[${song.title}](${song.url}) \n ${song.duration}`)
		.addField("`Requested by:`",`<@${msg.author.id}>`)
		msg.channel.send(queueEmbed);}
		
    const dispatcher = serverQueue.connection.playStream(ytdl(song.url, {filter : 'audioonly'}))
		.on('end', () => {
			//console.log('Music ended!');
			serverQueue.songs.shift();
            play(guild, serverQueue.songs[0], msg);
		})
		.on('error', error => {
			console.error(error);
		});
	dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
}

async function play1(key,msg,serverQueue,){
	let videos = await youtube.searchVideos(key)
	//console.log(videos.title)
	
		const message = {
            content: `.play ${videos.url}`,
            member: {
            voiceChannel: msg.member.voiceChannel
            },
            guild: {
            id: msg.guild.id
            },
            channel: msg.channel}
			//console.log(vidurl)

    execute(message, serverQueue);
}

async function search(key,msg,serverQueue){
    ytsearch(key,function ( err, r ) {
		if ( err ) throw err
		const videos = r.videos
		const video1 = videos[0]
		const video2 = videos[1]
		const video3 = videos[2]
		const video4 = videos[3]
		const video5 = videos[4]
		let songEmbed = new Discord.RichEmbed()
		.setTitle("Song List")
		.setColor("#f4e542")
		.addField("[1]",`|${video1.title}`)
		.addField("[2]",`|${video2.title}`)
		.addField("[3]",`|${video3.title}`)
		.addField("[4]",`|${video4.title}`)
		.addField("[5]",`|${video5.title}`)
		
		msg.channel.send(songEmbed);

		const filter = m => !isNaN(m.content) && m.content<6 && m.content>0

	    let collector = msg.channel.createMessageCollector(filter,{time: 10000})

        collector.once('collect',function(m){
			const url = videos[m.content-1].url
			//console.log(url)
			const dur = videos[m.content-1].duration.timestamp
			let message ={
				content: `.play https://www.youtube.com${url}`,
				member: {
					voiceChannel: msg.member.voiceChannel,
					id: msg.member.id
					},
					guild: {
					id: msg.guild.id
					},
					channel: msg.channel,
					author:{
					   id: msg.author.id
					}
			}
		    execute(message,serverQueue,dur)
		})
	})
	
	
	
}

async function play2(key,msg,serverQueue){
    ytsearch(key,function ( err, r ) {
		if ( err ) throw err
		const videos = r.videos
		const url = videos[0].url
		const dur = videos[0].duration.timestamp
		//console.log(dur)
		let message ={
			content: `.play https://www.youtube.com${url}`,
			member: {
				voiceChannel: msg.member.voiceChannel,
				id: msg.member.id
				},
				guild: {
				id: msg.guild.id
				},
				channel: msg.channel,
				author:{
                   id: msg.author.id
				}
		}
		execute(message,serverQueue,dur)
	})
}