//all of the libaries that we are importing
//npm install express nunjucks
const express = require('express');
/************
 * import our templating library
 ************/
const nunjucks = require('nunjucks');

//app is express sever that uses express libary variable
const app = express();

// all css and front-end js will go in public folder
// app.use are settings for our server that happens between when the server runs and when it recieves a request
app.use(express.static('public'));
// allows us to use request.body
//express.urlencoded allow us to process POST requests
// if we have app.post, we NEED this line
app.use(express.urlencoded({ extended: true }));

/************
 * add our nunjucks settings under our middleware
 * this links our express application to the templating tool
 ************/

//more settings to setup our njk files
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});
app.set('view engine', 'njk');


//store data on server using an array variable
let allData = [];



///////// POST FIRE ALARM NOTES
//response.reder alwasys goes inside an app.get OR app.post
app.get('/', (request, response) => {
    // response.render accepts 2 parameters:
    // 1: the name of the njk file
    // 2: a javascript object. the properties you pass into this object are the variables that you use in the .njk files
    // serverData is the name of the variable we used in baseLayout.njk
    //regular homepage rendering
    response.render('home.njk');
})

app.get('/form', (request, response) => {
    response.render('form.njk')
})

app.get('/view-all', (request, response) => {

    //optional second command in render: data from the server
    response.render('view-all.njk', { messagesArrayFromServer: allData })

})


app.post('/send-message', (request, response) => {
    //this aciton will handle
    //1. storing the data from the form on the server -> the array
    console.log(request.body)
    allData.push(request, body)
    //2. redirect to where we want the data to be displayed
    response.redirect('')


})

//last thign is to start server to run
//app.listen is listening for request
app.listen(8080, () => {
    // to run the server:
    // 1. make sure you are in the correct folder
    // if you type pwd it should print out the path to class_14_demo
    // if it does not show class_14_demo, you need to navigate to the folder using cd
    // 2. in terminal use the starting command: node --watch server.js 
    // another way to do this is to add a script in package.json (go to that file and look at line 8)
    console.log('http://localhost:8080')
})