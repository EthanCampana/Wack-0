//LIST OF HELPFUL FUNCTIONS
exports = module.exports  = {
        //array of functions to be loaded in easier
        
       "getMovie": function(movies, embed){
        let genres = Object.keys(movies);
        let ri =  Math.floor(Math.random() * genres.length)
        let genre = genres[ri];
        let reroll = 0;
        if(movies[genre].length < 50){
             reroll++;
             ri =  Math.floor(Math.random() * genres.length)
             genre = genres[ri];
        }
        if(movies[genre].length < 40){
            reroll++;
             ri =  Math.floor(Math.random() * genres.length)
             genre = genres[ri];
        }
        if(movies[genre].length < 30){
            reroll++;
             ri =  Math.floor(Math.random() * genres.length)
             genre = genres[ri];
        }
        if(movies[genre].length < 20){
            reroll++;
             ri =  Math.floor(Math.random() * genres.length)
             genre = genres[ri];
        }
        if(movies[genre].length < 1){
            reroll++;
             ri =  Math.floor(Math.random() * genres.length)
             genre = genres[ri];
        }
        console.log(`Reroll Count: ${reroll}`);
        ri =  Math.floor(Math.random() * movies[genre].length)
        let movie = movies[genre][ri];
        embed.setColor('#df8e92')
        .setTitle(`${genre}`)
        .setAuthor(`${movie.name}`)
        .addBlankField()
        .addField('Sub-Genre', `${this.subGenres(movie)}`)
        .setDescription(`${movie.description}`)
        .setThumbnail(`${movie.image}`)
        .setImage(`${movie.image}`);
        return [movie,embed];
       },

       "getActionMovie": function(movies, embed){
        let genre = 'Action';
        ri =  Math.floor(Math.random() * movies.Action.length)
        let movie = movies.Action[ri];
        console.log(movies.Action[ri])
        embed.setColor('#df8e92')
        .setTitle(`${genre}`)
        .setAuthor(`${movie.name}`)
        .addBlankField()
        .addField('Sub-Genre', `${this.subGenres(movie)}`)
        .setDescription(`${movie.description}`)
        .setThumbnail(`${movie.image}`)
        .setImage(`${movie.image}`);
        return [movie,embed];
       },

       "subGenres": function(movie){
        let string = "none";
        let check = movie.hasOwnProperty('subGenres');
        if(check){
            string = movie.subGenres;
            return string;
        }
        return string;
       }

}