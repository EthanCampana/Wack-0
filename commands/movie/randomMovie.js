const commando = require('discord.js-commando');
const { RichEmbed } = require('discord.js');
const helpful = require('../functions/helpful.js');
const ytSearch = require( 'yt-search' )
var fs = require('fs');
class RandomMovie extends commando.Command{
    constructor(client){
        super(client,{
           name: 'rm',
           aliases: ['randommovie', 'getmovie',],
           group: 'movie',
           memberName: 'movies',
           description: 'Get a random movie'

        });
    }

    async run(message, args){
        message.delete();
        message.say(" :crash2: WOAH how about this movie?");
        let rawdata = fs.readFileSync( __dirname +'/movies.json');  
        let movies = JSON.parse(rawdata);
        let embed =  new RichEmbed();
        let stuff = helpful.getMovie(movies,embed);
        embed = stuff[1];
        message.say(embed);
        let choices = ['NO','NAH','YES','SURE','OK','NAH','NOPE'];
        let bad = ['NO','NAH','NOWAY','NOPE'];
        let good =['YES','SURE','OK','ALRIGHT'];
        let filter = m => choices.includes(m.content.toUpperCase());
        let attempts = 10;
        let geturl = false;
        
        while(attempts > 0){
           await message.channel.awaitMessages(filter,{max: 1, time: 10000}).then(collected =>{
                if(collected.first() == undefined){
                    attempts--
                    return;
                }
                if(bad.includes(collected.first().content.toUpperCase())){
                    embed =  new RichEmbed();
                    stuff = helpful.getMovie(movies,embed);
                    embed = stuff[1];
                    message.say(embed);
                    attempts--;
                    return;
            }
            if(good.includes(collected.first().content.toUpperCase())){
                geturl = true;
                attempts = -1;
    
        }


});
    if(geturl){
        let base_url = 'https://www.youtube.com'
        await ytSearch( stuff[0].name + " trailer", function ( err, r ) {
                    if ( err ) throw err
                    const videos = r.videos
                    const firstResult = videos[ 0 ]
                   
                    console.log( videos )
                    let url = base_url + firstResult.url;
                    message.say(url);
            } );
            }
       
    }
}

}

module.exports = RandomMovie;   