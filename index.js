const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


//Fake DB
const comments = [
    {
        id: uuid(),
        username: "Todd",
        comment: "Lol ThaT IS SO FUNNY"
    },
    {
        id: uuid(),
        username: "Jon",
        comment: "I mean, it was kinda funny"
    },
    {
        id: uuid(),
        username: "Cody",
        comment: "Not funny. Definitely not funny."
    },
    {
        id: uuid(),
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
    comments.push({ username, comment, id: uuid() })
    res.redirect('/comments')
})

//Show/Detail route

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment })
})

//Edit Get route (Form route)
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment })
})

//Edit patch Route
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments')
})

app.listen(port, () => {
    console.log(`Connected on port ${port}`)
})