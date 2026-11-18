// this is building off of class-19-demo
// the only difference is adding njk
const express = require('express');
const nunjucks = require('nunjucks');
let nedb = require('@seald-io/nedb');

const app = express();
let database = new nedb({
    filename: 'mydatabase.db',
    autoload: true
});

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
nunjucks.configure('views', {
    autoescape: true,
    express: app,
});
app.set('view engine', 'njk');



//to change from url
//change route to whatever you want
//route is currently '/'
app.get('/', (req, res) => {

    res.render('form.njk');
});

app.post('/add-data', (req, res) => {
    // if need extra data to be stored:
    let dataToBeAdded = {
        user: req.body.username,
        number: req.body.count,
        url: req.body.url,
        text: req.body.text,
        timestamp: Date.now(),
    };

    database.insert(dataToBeAdded, (error, newData) => {
        if (error) {
            console.log(error);
            res.send('error, data was not added');
        } else {
            console.log(newData);
            res.send('data added successfully');
        }
    });
});

app.get('/get-data', (request, response) => {
    let query = {};
    database.find(query, (error, retrieveData) => {
        console.log(retrieveData)
        response.json(retrieveData)
    })
    database.find(query, (error, retrievedData) => {
        console.log(retrievedData);
        response.json(retrievedData);
    });
});

app.listen(6004, () => {
    console.log('http://localhost:6004');
});