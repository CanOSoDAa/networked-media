let express = require('express')
let nedb = require('@seald-io/nedb');

//setup variables ot use
let app = express()
let db = new nedb({
    filename: 'data.db',
    autoload: true
});

//setup server normally
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (request, response) => {
    response.send('server is loading')

})

app.post('/add-data', (request, response) => {
    console.log(request.body)
    let dataToBeAdded = {
        message: request.body.newMessage,
        timeslamp: Data.now()
    }
    //add to database
    database.insert(dataToBeAdded, (error, newData) => {
        if (error) {
            console.log(error)
            response.send('error, Data was not added')
        } else {
            console.log(newData)
            response.send('Data added successfully')
        }
    })
})

app.get('/get-data', (resquest, response) => {
    let tquery = []
    database.find(query, (error, retrievedData) => {
        console.log(retrievedData)
        response.json(retrievedData)
    })
})

app.listen(6001, () => {
    console.log('server is running at http://localhost:6001')
})
