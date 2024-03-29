const express = require('express')
const request = require('request');
var sslRedirect = require('heroku-ssl-redirect');

const app = express()

var accessToken;



// enable ssl redirect
app.use(sslRedirect());

app.set('view engine', 'ejs');

app.get('/aframe', function (req, res) {
	res.render('aframe');
})
app.get('/three', function (req, res) {
	res.render('three');
})





app.get('/ig', function (req, res) {


	if ( ! req.query.code) {

		//
		// NO CODE
		//

		res.render('login', {
			clientID 	: process.env.INSTAGRAM_CLIENT_ID,
			redirectURL : process.env.INSTAGRAM_CALLBACK_URL,
			code 		: req.query.code
		});
	}

	else {

		//
		// WE HAVE ACCESS CODE
		//

		request.post({
			url 	: 'https://api.instagram.com/oauth/access_token',
			form	: {
				client_id 		: process.env.INSTAGRAM_CLIENT_ID,
				client_secret 	: process.env.INSTAGRAM_CLIENT_SECRET,
				grant_type 		: 'authorization_code',
				redirect_uri 	: process.env.INSTAGRAM_CALLBACK_URL,
				code 			: req.query.code
			}
		}, function (error, response, body) {

			var obj = JSON.parse(body);
			accessToken = obj.access_token;

			// get this users recent photos
			request.get('https://api.instagram.com/v1/users/self/media/recent/?access_token='+accessToken, function (error, response, body) {
				res.render('ig-result', {
					photos	: JSON.parse(body)
				});
			});

		});
	}


})



app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port ' + process.env.PORT)
})