const express = require('express')
const app = express()
const path = require('path')
const { create } = require('express-handlebars')

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'layout',
    layoutsDir: './views/layouts'
})

app.use(express.static(path.join('views')))
app.use(express.urlencoded({ extended: true }))

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

const users = [
    { name: 'Tom', age: 50, id: 5 },
    { name: 'Harry', age: 90, id: 6 },
    { name: 'Nyuton', age: 10, id: 7 },
]

// router
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Home page',
        isHome: true
    })
})

app.get('/users', function (req, res) {
    res.render('users', {
        title: 'Users page',
        users,
        isUsers: true
    })
})

app.post('/add/user', function (req, res) {
    req.body.id = Math.random()
    req.body.age = +req.body.age
    users.push(req.body)
    res.redirect('/users')
})

app.get('/about', function (req, res) {
    res.render('about', {
        title: 'About page',
        isAbout: true
    })
})

app.listen(3000, function () {
    console.log('Server is running with port 3000');
})