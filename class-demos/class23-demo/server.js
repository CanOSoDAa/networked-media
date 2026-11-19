// Q: how do we know this is a node project?
// A: package.json

// Q: how do we run this project?
// A: node --watch server.js

// Q: Try running the project. What command do you need to run to get it to work and why do you need to run that command?
// A: npm install
// 		because node_modules does not exist, packages are not installed

// 1. import libraries
const express = require('express');
const multer = require('multer');
const nedb = require('@seald-io/nedb');
const nunjucks = require('nunjucks')
const cookieParser = require('cookie-parser')


// Q: what do these variables do? write the answer above each declaration.
// A: initialzes app to be an express server
const app = express();
// A: initializes upload to use multer library and set the destination of all of the uploaded files to public/uploads/
const upload = multer({
	dest: 'public/uploads',
});
// A: initializing database variable to use nedb library and setting up the file to store the database
const database = new nedb({
	filename: 'database.db',
	autoload: true,
});

// Q: what do each of these items set up? write above each item configuration.
// A: configures the views folder as where our .njk files live
nunjucks.configure('views', {
	autoescape: true,
	express: app,
	noCache: true // NEW! we don't have to restart the server for .njk updates :)
});
// A: sets the public folder for our front-end code (html, css, front-end js interactions)
app.use(express.static('public'));
// A: allows us to access the body of a request (request.body, req.body)
app.use(express.urlencoded({ extended: true }));
// A: allow the app to render njk files
app.set('view engine', 'njk');
//new addign middileware to cookie
app.use(cookieParser())

// Q: what route do we use to go to the home page? how do we access it in the browser?
// A: route /
// browser: 
// 		- on droplet http://your-ip-address:port/
// 		- on computer http://localhost:port/
app.get('/', (req, res) => {

	//local variable to track number of visit
	let totalVists = 1

	if (req.cookies.vists) {
		let convertToNumber = parseInt(req.cookies.vists)
		totalVists = convertToNumber + 1
	}
	//create cookie using response parameter
	//sending the cookie back to the client
	//1. the name of the cookie in string format
	//2. value of cookie
	//objects of the cookie attributes
	res.cookie('vists', totalVists, { expires: new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1000) })


	res.render('home.njk', { serverdata: totalVists })
})

app.listen(6005, () => {
	console.log(`http://localhost:6005`)
})