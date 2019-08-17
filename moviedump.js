var osmosis = require('osmosis');
var fs = require('fs');
async function getMovies(url) {
    return new Promise((resolve, reject) => {
        let response = [];
       osmosis
            // Load upcoming music page
            .get(url)
            // Find the first music table and all of its tr elements
            .find('div.lister-item.mode-detail')
            // Construct an object containing release date and its relevant releases
            .set({
                // Get the release date (if relevant)
                name: 'img@alt',
                genre: 'span.genre',
                description: 'div.lister-item-content p[2]',
                image: 'img@loadlate'
                // For every release on this date create an array
            })
            // Transform our flat data into a tree like structure by creating a nested object
                   // Push post into an array
            .data(res => response.push(res))
            .error(err => reject(err))
            .done(() => resolve(response));
           });
        }
let rawdata = fs.readFileSync( __dirname +'/movies.json');  
let movies = JSON.parse(rawdata);

skipcounter = 0;
function check(genre,name){
    let index =  movies[genre].findIndex((value,index,array) => {return value.name == name});
    if(index > -1){
        skipcounter++;
        return true;
        
    }
    return false;
}
urls = [
'https://www.imdb.com/list/ls022373189/?ref_=tt_rls_5',
'https://www.imdb.com/list/ls024330711/?ref_=otl_1',
'https://www.imdb.com/list/ls024330711/?ref_=otl_1&sort=list_order,asc&st_dt=&mode=detail&page=2',
'https://www.imdb.com/list/ls024330711/?ref_=otl_1&sort=list_order,asc&st_dt=&mode=detail&page=3',
'https://www.imdb.com/list/ls024330711/?ref_=otl_1&sort=list_order,asc&st_dt=&mode=detail&page=4',
'https://www.imdb.com/list/ls024330108/?ref_=otl_2',
'https://www.imdb.com/list/ls024330108/?ref_=otl_2&sort=list_order,asc&st_dt=&mode=detail&page=2',
'https://www.imdb.com/list/ls024330013/?ref_=otl_3',
'https://www.imdb.com/list/ls024330013/?ref_=otl_3&sort=list_order,asc&st_dt=&mode=detail&page=2'
]

for(let z = 0; z < urls.length; z++){
    getMovies(urls[z]).then(res => {
        for(let i = 0; i < res.length; i++){
            let genre = res[i].genre.split(',');
            let obj = {};
            let isGenre = movies.hasOwnProperty(genre[0]);
            if(isGenre == false){
            movies[genre[0]] = [];
            obj.name = res[i].name;
            obj.description = res[i].description;
            obj.image = res[i].image;
            if(genre.length > 1){
                let subGenres = "";
                for(let z = 1; z < genre.length; z++){
                    subGenres += `${genre[z]},  `
                }
                obj.subGenres = subGenres;
                if(check(genre[0],res[i].name)){continue;}
                movies[genre[0]].push(obj);
                continue;
            }
            if(check(genre[0],res[i].name)){continue;}
            movies[genre[0]].push(obj);
            continue;
            }
            obj.name = res[i].name;
            obj.description = res[i].description;
            obj.image = res[i].image;
            if(genre.length > 1){
                let subGenres = "";
                for(let z = 1; z < genre.length; z++){
                    subGenres += `${genre[z]},  `
                }
                obj.subGenres = subGenres;
                if(check(genre[0],res[i].name)){continue;}
                movies[genre[0]].push(obj);
                continue;
            }
            if(check(genre[0],res[i].name)){continue;}
            movies[genre[0]].push(obj);
        }
        let data = JSON.stringify(movies);  
        fs.writeFileSync(__dirname +'/movies.json', data);
        console.log("Dump Completed")
        console.log(`Dumped: ${res.length} Skipped: ${skipcounter}`)
    });
}

