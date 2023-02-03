//root 
const express = require('express');
const app = express();

app.use(express.json());

let books = [
    {id: 1, tiile: "Harry Potter", description: "The long one"},
    {id: 2, title: "1984", description: "You know the one I'm talking about"},
    {id: 3, title: "The Linux bible", description: "If this doesn't prove this OS is a cult I don't know what will"}
]

const port = 5600;

app.listen(port, ()=>{
    console.log(`Server is currently runing on ${port}`)
})

// look up all
app.get('/api/books', (req, res) =>{
    res.send(books)
})

// look up individual
app.get('/api/books/:id', (req, res) =>{
    const single_book = books.find(book => book.id === parseInt(req.params.id));
    if(!single_book) res.status(404).send("not found");

    res.send(single_book)
});

// create new
app.post('/api/books', (req, res) => {
    const book = {
        id: books.length +1,
        title: req.body.title,
        description: req.body.description
    };

    books.push(book)
    res.send(books)
})

// update existing stuff
app.put('/api/books/:id', (req, res)=>{
    const single_book = books.find(book => book.id === parseInt(req.params.id));
    if(!single_book) res.status(404).send("not found")

    single_book.title = req.body.title
    single_book.description = req.body.description
    res.send(single_book)
});

// wipe it
app.delete('/api/books/:id', (req, res) => {
    const single_book = books.find(book => book.id === parseInt(req.params.id));
    if(!single_book) res.status(404).send("not found")

    const book_index = books.indexOf(single_book);
    books.splice(book_index, 1);

    res.send(single_book);
})