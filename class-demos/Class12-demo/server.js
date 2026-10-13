//importing express library to use it as our server
// naming conventions usually name the variable the libary name

const express = require('express')

//initialized application using express

const app = express()


//"middleware"
//settings our  app needs to know about the server
//serves our front-end html that exists in the public folder.
//allows us to access front-end using GET request by default
app.use(express.static("public"));
//allows us to access the body of a POST request
app.use(express.urlencoded({ extended: true })
//routes
//get /firstserver, callback function
app.get('/firstserver', (request, response) => {
    //send the info to the client that makes a request to the first server
    response.send('this is my first server!')
})

//LAST THING

app.listen(8080, () => {
    console.log('http://127.0.0.1:8080')
})