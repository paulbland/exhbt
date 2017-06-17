const express = require('express')
const app = express()


var request = require('request');


app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('index');
})



app.get('/ig', function (req, res) {


	// if code sent
	//hit up ig api with it 
	// and will get token back



	// If code receid
	if (req.query.code) {

var myURL = 'https://api.instagram.com/oauth/access_token?client_id='+process.env.INSTAGRAM_CLIENT_ID+'&client_secret='+process.env.INSTAGRAM_CLIENT_SECRET+'&grant_type=authorization_code&redirect_uri='+process.env.INSTAGRAM_CALLBACK_URL+'&code='+req.query.code;

console.log(myURL);
		
		request(myURL, function (error, response, body) {
		  console.log('error:', error); // Print the error if one occurred
		  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
		  console.log('body:', body); // Print the HTML for the Google homepage.
		});

		   

	}




	res.render('ig', {
		clientID 	: process.env.INSTAGRAM_CLIENT_ID,
		redirectURL : process.env.INSTAGRAM_CALLBACK_URL,
		code 		: req.query.code
	});
})



app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port ' + process.env.PORT)
})