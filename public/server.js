const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path');
const apiData = require('../db/db.json');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Notes Page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'notes.html'));
});

// Api Data - GET
app.get('/api/notes', (req, res) => {
    res.json(apiData);
});

// Api Data - POST
app.post('/api/notes', (req, res) => {

})

// If the path does not exist, send index.html (home page) - It is important to call this last so that it does not override the other routes/paths that we have designated
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// tell computer to listen to port for app to run
app.listen(PORT, () =>
  console.log(`Currently listening at http://localhost:${PORT}`)
);