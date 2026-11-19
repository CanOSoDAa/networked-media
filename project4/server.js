
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

app.get('/', (req, res) => {
    res.render('form.njk');
});

app.post('/add-data', (req, res) => {

    let dataToBeAdded = {
        name: String(req.body.name || '').trim(),
        category: String(req.body.category || '').trim(),
        text: String(req.body.text || '').trim(),
        timestamp: Date.now(),
    };

    if (!dataToBeAdded.name ||
        !dataToBeAdded.category ||
        !dataToBeAdded.text) {
        return res.status(400).send('Please complete all fields.');
    }

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

    database.find(query, (error, retrievedData) => {
        if (error) {
            return response.status(500).send('error retrieving data');
        }

        console.log(retrievedData);
        response.json(retrievedData);
    });
});

app.listen(6003, () => {
    console.log('http://localhost:6003');
});
