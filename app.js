const express = require('express')
const request = require('request');
const app = express()



app.set('view engine', 'ejs');

app.get('/', function (req, res) {
	res.render('index');
})


app.get('/ig', function (req, res) {

	// If code recvd
	if (req.query.code) {

		request.post({
			url 	: 'https://api.instagram.com/oauth/access_token',
			form	: {
				client_id 		: process.env.INSTAGRAM_CLIENT_ID,
				client_secret 	: process.env.INSTAGRAM_CLIENT_SECRET,
				grant_type 		: 'authorization_code',
				redirect_uri 	: process.env.INSTAGRAM_CALLBACK_URL,
				code : req.query.code
			}
		}, function (error, response, body) {
			console.log('error:', error); // Print the error if one occurred
			console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
			console.log('body:', body); // Print the HTML for the Google homepage.
		});
	}

	// Show page
	res.render('ig', {
		clientID 	: process.env.INSTAGRAM_CLIENT_ID,
		redirectURL : process.env.INSTAGRAM_CALLBACK_URL,
		code 		: req.query.code
	});
})



app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port ' + process.env.PORT)
})