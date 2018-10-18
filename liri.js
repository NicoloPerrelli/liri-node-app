require("dotenv").config();
var keys = require("./keys.js");
console.log(keys);

var nodeArgs = process.argv;
var askName = "";

//throws the switch the needed info
for (var i = 2; i < nodeArgs.length; i++) {
	if (i > 2 && i < nodeArgs.length) {askName = askName + "+" + nodeArgs[i];}
	else {askName += nodeArgs[i];}
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
		do_what_it_says(askName);
	break;
}

function concert_this(x){

	request("https://rest.bandsintown.com/artists/" + x + "/events?app_id=codingbootcamp", function(error, response, body){
		if (!error && response.statusCode === 200) {

			console.log("The Name of the venue: " + JSON.parse(body).name);
			console.log("The Venue location: " + JSON.parse(body).location);
			console.log("The Date of the Event: " + JSON.parse(body).date);
	}});
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
 
	var spotify = new Spotify({
		id: keys[0],
  		secret: keys[1]
	});
 
	spotify.search({ type: 'track', query: x }, function(err, data) {
		  if (err) {console.log('Error occurred: ' + err);}
		  
		console.log("Artist(s): " + JSON.parse(data).artist);
		console.log("Song name: " + JSON.parse(data).name);
		console.log("Link: " + JSON.parse(data).link);
		console.log("Album: " + JSON.parse(data).album);

	});
}

/*
	  * Artist(s)
	  * The song's name
	  * A preview link of the song from Spotify
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

			// Then we print out the imdbRating
			console.log("The movie's Title is: " + JSON.parse(body).title);
			console.log("The movie's Year of Release is: " + JSON.parse(body).year);
			console.log("The movie's IMDB Rating is: " + JSON.parse(body).imdbRating);
			console.log("The movie's Rotten Tomatoes Rating is: " + JSON.parse(body).rottenTomatoesRating);
			console.log("The movie is made in: " + JSON.parse(body).country);
			console.log("The movie's Language is: " + JSON.parse(body).language);
			console.log("The movie's Plot is: " + JSON.parse(body).imdbRating);
			console.log("The movie's Actors are: " + JSON.parse(body).actors);
	}});
}

function do_what_it_says(x){

}
/*
	4. `node liri.js do-what-it-says`

	* Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

	  * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.

	  * Edit the text in random.txt to test out the feature for movie-this and concert-this.

*/


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