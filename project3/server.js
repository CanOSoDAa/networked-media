const express = require('express')
const nunjucks = require('nunjucks')
const multer = require('multer')
const sqlite3 = require('sqlite3').verbose()

const app = express()
const port = process.env.PORT || 3000

const upload = multer({
    dest: 'public/uploads/'
})

const db = new sqlite3.Database('objects.db')

db.run(`
    CREATE TABLE IF NOT EXISTS objects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        name TEXT,
        description TEXT,
        photo TEXT
    )
`)

nunjucks.configure('views', {
    autoescape: true,
    express: app
})

app.set('view engine', 'njk')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index.njk')
})

app.get('/archive', (req, res) => {

    db.all(
        'SELECT * FROM objects ORDER BY id DESC',
        [],
        (err, objects) => {

            if (err) {
                console.log(err)
                return res.send('Error loading archive')
            }

            res.render('archive.njk', {
                objects: objects
            })
        }
    )
})

app.get('/about', (req, res) => {
    res.render('about.njk')
})

app.get('/upload', (req, res) => {
    res.render('upload.njk')
})

app.post('/upload', upload.single('photo'), (req, res) => {

    const title = req.body.title
    const name = req.body.name
    const description = req.body.description
    const photo = req.file.filename

    db.run(
        `
        INSERT INTO objects
        (title, name, description, photo)
        VALUES (?, ?, ?, ?)
        `,
        [title, name, description, photo],

        (err) => {

            if (err) {
                console.log(err)
                return res.send('Upload failed')
            }

            res.redirect('archive')
        }
    )
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})