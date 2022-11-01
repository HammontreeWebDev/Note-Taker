const express = require('express');
const PORT = process.env.PORT || 3001;
const apiData = require('./db/db.json');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Home Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// Notes Page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// Api Data
app.get('/api/notes', (req, res) => {
    res.json(apiData);
});

app.post('api/notes', (req, res) => {
    
})

// tell computer to listen to port for app to run
app.listen(PORT, () =>
  console.log(`Currently listening at http://localhost:${PORT}`)
);