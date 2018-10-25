require("dotenv").config();
var request = require("request");
var keys = require("./keys.js");

var nodeArgs = process.argv;
var askName = "";

//throws the switch the needed info
for (var i = 3; i < nodeArgs.length; i++) {
	if(i==3)
		askName = nodeArgs[i];
	else
		askName = askName + "+" + nodeArgs[i];
}

// finds what to do with movie or band
switch (process.argv[2]){

	case "concert-this":
		concert_this(askName);
	break;

	case "spotify-this-song":
		spotify_this_song(askName);
	break;

	case "movie-this":
		movie_this(askName);
	break;

	case "do-what-it-says":
		do_what_it_says();
	break;
}

function concert_this(x){

	request("https://rest.bandsintown.com/artists/" + x + "/events?app_id=codingbootcamp", function(error, response, body){
		if (!error && response.statusCode === 200) {

			var jsonData = JSON.parse(body);
			for(let i = 0; i < jsonData.length; i++){
			console.log("\n==========================================\nThe Name of the venue: " + jsonData[i].venue.name + "\nThe Venue location: " + jsonData[i].venue.city + ", " + jsonData[i].venue.country + "\nThe Date of the Event: " + jsonData[i].datetime + "\n==========================================");
	}}});
/*
	  * Name of the venue
	  * Venue location
	  * Date of the Event (use moment to format this as "MM/DD/YYYY")
*/
}

function spotify_this_song(x){

	//* If no song is provided then your program will default to "The Sign" by Ace of Base.
	if (x=="")
	x="The Sign"

	var Spotify = require('node-spotify-api');
	
	var spotify = new Spotify(keys.spotify);

spotify
  .search({ type: 'track', query:x})
  .then(function(response) {
    console.log("Artist: " + response.tracks.items[0].album.artists[0].name + "\nAlbum: " + response.tracks.items[0].album.name + "\nLink: " + response.tracks.items[0].album.artists[0].external_urls.spotify);
  })
  .catch(function(err) {
    console.log(err);
  });
}

/*
	  * The album that the song is from

	* You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.

	* The Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

	* Step One: Visit <https://developer.spotify.com/my-applications/#!/>

	* Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

	* Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

	* Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).
*/

function movie_this(x){

	//If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
	if (x=="")
		x="Mr. Nobody"

	request("http://www.omdbapi.com/?t=" + x + "&y=&plot=short&apikey=trilogy", function(error, response, body) {

		// If there were no errors and the response code was 200 (i.e. the request was successful)...
		if (!error && response.statusCode === 200) {

			var jsonData = JSON.parse(body);
			// Then we print out the imdbRating

			console.log("\n==========================================================================" + "\nMovie Title: " + jsonData.Title + "\nYear of Release: " + jsonData.Year + "\nIMDB Rating is: " + jsonData.Ratings[0].Value + "\nRotten Tomatoes Rating is: " + jsonData.Ratings[1].Value + "\nIs made in: " + jsonData.Country + "\nThe movie's Language(s): " + jsonData.Language + "\nThe Actors are: " + jsonData.Actors + "\n\nThe Plot is: " + jsonData.Plot + "\n==========================================================================");
	}});
}

function do_what_it_says(){//grab text from random then test what we need to do again.
	console.log("ENTERHERE")
	$.get('random.txt',{},function(content){
      let lines=content

		switch (lines[0]){

			case "concert-this":
				concert_this(lines[1]);
			break;
		
			case "spotify-this-song":
				spotify_this_song(lines[1]);
			break;
		
			case "movie-this":
				movie_this(lines[1]);
			break;
		//no do-what is says else we could be stuck in a loop forever.
		}
	});
}

/*
### BONUS

* In addition to logging the data to your terminal/bash window, output the data to a .txt file called `log.txt`.

* Make sure you append each command you run to the `log.txt` file.

* Do not overwrite your file each time you run a command.

### Reminder: Submission on BCS

* Please submit the link to the Github Repository!

- - -

### Minimum Requirements

Attempt to complete homework assignment as described in instructions. If unable to complete certain portions, please pseudocode these portions to describe what remains to be completed. Adding a README.md as well as adding this homework to your portfolio are required as well and more information can be found below.
*/