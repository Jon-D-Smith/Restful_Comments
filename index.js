const express = require('express');
const app = express();
const port = 3000;
const path = require('path')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


//Fake DB
const comments = [
    {
        username: "Todd",
        comment: "Lol ThaT IS SO FUNNY"
    },
    {
        username: "Jon",
        comment: "I mean, it was kinda funny"
    },
    {
        username: "Cody",
        comment: "Not funny. Definitely not funny."
    },
    {
        username: "Bert",
        comment: "Me Herbert"
    }
]
//Load initial index page with fake comments
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})
//Load the form page to add a new comment
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
})
//Post route to get data, push it to the fake comments array, then redirect to the index view
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment })
    res.redirect('/comments')
})

app.listen(port, () => {
    console.log(`Connected on port ${port}`)
})