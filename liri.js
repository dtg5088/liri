
require("dotenv").config();
var fs = require("fs");
var axios = require("axios"); 
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var stringify = require('json-stringify-safe');
var moment = require('moment');

var spotify = new Spotify(keys.spotify);

//code that takes CLI input
var task = process.argv[2];
var element = process.argv.slice(3).join(" ");




fs.readFile("random.txt", "utf8", function(err, data) {
    if (err) {
      return console.log(err);
    } else {

        if(process.argv[2] = " "){
        var str = data;
        var array = str.split(",");
        
        console.log(array);
     var outputTo = {    
        task: array[0],
        element: array[1]
        }
        console.log(outputTo);
        return outputTo;
    }
    }
});


if(task=='spotify-this-song'){
spotify
  .search({ type: 'track', query: element })
  .then(function(response) {

    var spotifyInfo = response.tracks.items[0];
    console.log(JSON.stringify(response.tracks.items[0],null,2));
    
    //variables to display to the console
    var artist = spotifyInfo.artists[0].name;
    var songName = spotifyInfo.name;
    var preview = spotifyInfo.preview_url;
    var album = spotifyInfo.album.name;

    if(songName === null){
        console.log("could not find song, Listen to this instead:");
        console.log("Artist: Ace of Base");
        console.log("Song Name: The Sign");
       
    }else{
    //posting collected information to the terminal
    console.log("Artist: "+artist);
    console.log("Song Name: "+songName);
    console.log("Preview Link: "+preview);
    console.log("Album: "+album);

    }

  })
  .catch(function(err) {
    console.log(err);
  });
}




if(task=='concert-this'){

    element = process.argv.slice(3).join("");

    console.log(element);

    // Then run a request with axios to the OMDB API with the movie specified
    var queryUrl = "https://rest.bandsintown.com/artists/" + element + "/events?app_id=codingbootcamp";

    // This line is just to help us debug against the actual URL.
    console.log(queryUrl);

    axios.get(queryUrl).then(function(response) {
        var jsonData = response.data;
        console.log(stringify(response.data[0], null, 2));

        var bandInfo = response.data[0];

        //storing collecting infomration to present to command line 
        var venue = bandInfo.venue.name;
        var location = bandInfo.venue.city+ " " +bandInfo.venue.region+ ", " +bandInfo.venue.country;
        var time = moment(bandInfo.datetime, "YYYY-MM-DD HH-mm-ss").format("MMMM Do YYYY, h:mm:ss a");

        console.log("Venue Name: "+venue);
        console.log("Location: "+location);
        console.log("Time of Event: "+time);

    })
    .catch(function (error) {
        console.log(error);
      });
}


if (task == "movie-this"){

    // Store all of the arguments in an array
    var nodeArgs = process.argv;

    // Create an empty variable for holding the movie name
    var movieName = "";

    // And do a little for-loop magic to handle the inclusion of "+"s
        for (var i = 3; i < nodeArgs.length; i++) {

            if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
            }
            else {
            movieName += nodeArgs[i];
            }
        }
        
        // Then run a request with axios to the OMDB API with the movie specified
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        
        // This line is just to help us debug against the actual URL.
        console.log(queryUrl);
        
        axios.get(queryUrl).then(
            function(response) {
            
            //console.log(stringify(response, null, 2));
            console.log(response);

            if (movieName === "" || movieName === null){
                //if user types in an empty answer
                console.log("Tile: Mr. Nobody");
                console.log("IMDB Rating: 7.9");
                //console.log("Rotten Tomatoes Rating: " + response.Ratings[1].value);
                console.log("Location: Belgium, Germany, Canada, France, USA, UK");
                console.log("Language(s): English, Mohawk");
                console.log("Plot: A boy stands on a station platform as a train is about to leave. Should he go with his mother or stay with his father? Infinite possibilities arise from this decision. As long as he doesn\'t choose, anything is possible.");
                console.log("Actors: Jared Leto, Sarah Polley, Diane Kruger, Linh Dan Pham");
                console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/")
            }else {
                console.log("Tile: " + response.data.Title);
                console.log("IMDB Rating: " + response.data.imdbRating);
                //console.log("Rotten Tomatoes Rating: " + response.Ratings[1].value);
                console.log("Location: " + response.data.Country);
                console.log("Language(s): " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
            }
            }
        )
        .catch(function (error) {
            console.log(error);
          });

}

