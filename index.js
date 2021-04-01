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

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
})


app.listen(port, () => {
    console.log(`Connected on port ${port}`)
})