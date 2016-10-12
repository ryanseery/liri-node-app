var parameters = process.argv.slice(3);
var liriCommand = process.argv[2];
var titleName = "";

for(i = 0; i < parameters.length; i++){
  titleName += parameters[i] + "";
}

function liriApp(appName, titleName) {
  //twitter
  var keys = require("./keys.js");
  var request = require('request');
  var twitter = require('twitter');
  var spotify = require('spotify');
  var fs = require('fs');
  //omdb
  var movieTitle;
  var movieUrl;
  var movieSearchResult;
  var songTitle;
  var commandArr;
  var commandLiri;
  var commandParameter;
}
switch (appName){
  case "my-tweets":
    var cliet = new Twitter({
      consumer_key: keys.twitterKeys.consumer_key,
      consumer_secret: keys.twitterKeys.consumer_secret,
      access_token_key: keys.twitterKeys.access_token_key,
      access_token_secret: keys.twitterKeys.access_token_secret
      });
      var params = {screen_name: 'SuperSeeryal'};
      client.get('statuses/user_timeline', params, function(error, tweets, response){
        if (!error) {
          fs.appendFile("log.txt", "\n");
          for (var i = 0; i < 20; i++) {
            console.log(tweets[i].text);
            fs.appendFile("log.txt", tweets[i].text + "\n");
          }
        }
      });
      break;
    case "spotify-this-song":
      if (parameters == "") {
          songTitle = "what's my age again";
      } else {
          songTitle = titleName;
      }
      spotify.search ({type: 'Track', query: songTitle}, function(err, data) {
          if ( err ) {
              console.log('Error: ' + err);
              return;
          }
          fs.appendFile("log.txt", "\n");
          for (var i = 0; i < 5; i++) {
            console.log("Artist: " + data.tracks.items[i].artists[0].name);
            console.log("Track: " + data.tracks.items[i].name);
            console.log("Album: " + data.tracks.items[i].album.name);
            console.log("Preview: " + data.tracks.items[i].external_urls.spotify);
            fs.appendFile("log.txt",  "Artist: " + data.tracks.items[i].artists[0].name + "\n");
            fs.appendFile("log.txt",  "Track: " + data.tracks.items[i].name + "\n");
            fs.appendFile("log.txt",  "Album: " + data.tracks.items[i].album.name + "\n");
            fs.appendFile("log.txt",  "Preview: " + data.tracks.items[i].external_urls.spotify + "\n");
          } 
      });
       songUrl = "http://ws.spotify.com/search/1/track.json?q=" + songTitle;
       request(songUrl, function (error, response, body) {
         if (!error && response.statusCode == 200) {
           var songInfo = JSON.parse(body);
           console.log(JSON.parse(body)["info"]);
           for (var i = 0; i < 5; i++) {
             console.log("Album: " + songInfo.tracks[i].album.name);
             console.log("Artist: " + songInfo.tracks[i].artists[0].name);
             console.log("Track: " + songInfo.tracks[i].name);
             console.log("Preview: " + songInfo.tracks[i].href);
           }
         }
       });
      break;
    case "movie-this":
      if (parameters == "") {
          movieTitle = "Mr. Nobody";
      }
      else {
          movieTitle = titleName;
      }
      movieUrl = "http://www.omdbapi.com/?t=" + movieTitle + "&tomatoes=true&y=&plot=short&r=json";
      request(movieUrl, function (error, response, body) {
            if (!error && response.statusCode === 200) {
              movieSearchResult = JSON.parse(body);
              console.log("Title: " + movieSearchResult.Title);
              console.log("ImdbRating: " + movieSearchResult.imdbRating);
              console.log("Country: " + movieSearchResult.Country);
              console.log("Language: " + movieSearchResult.Language);
              console.log("Plot: " + movieSearchResult.Plot);
              console.log("Actors: " + movieSearchResult.Actors);
              console.log("Rotton Tomatoes Rating: " + movieSearchResult.tomatoRating);
              console.log("Rotton Tomatoes url: " + movieSearchResult.tomatoURL);
              fs.appendFile("log.txt", "\n");
              fs.appendFile("log.txt",  "Title: " + movieSearchResult.Title + "\n");
              fs.appendFile("log.txt",  "ImdbRating: " + movieSearchResult.imdbRating + "\n");
              fs.appendFile("log.txt",  "Country: " + movieSearchResult.Country + "\n");
              fs.appendFile("log.txt",  "Language: " + movieSearchResult.Language + "\n");
              fs.appendFile("log.txt",  "Plot: " + movieSearchResult.Plot + "\n");
              fs.appendFile("log.txt",  "Actors: " + movieSearchResult.Actors + "\n");
              fs.appendFile("log.txt",  "Rotton Tomatoes Rating: " + movieSearchResult.tomatoRating + "\n");
              fs.appendFile("log.txt",  "Rotton Tomatoes url is: " + movieSearchResult.tomatoURL + "\n");
            }
          });
      break;
    case "do-what-it-says":
      fs.readFile("random.txt", "utf8", function(error, commandData) {
          commandArr = commandData.split(',');
          commandLiri = commandArr[0];
          commandParameter = commandArr[1];
          liriApp(commandLiri, commandParameter);
          console.log("Parameter: " + commandParameter);
          console.log("Command: " + commandLiri);
      });  
      break;
    default:
      console.log("No command."); 
      break;
  }
}

liriApp(liriCommand, titleName);