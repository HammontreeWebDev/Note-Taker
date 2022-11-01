const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path');
const apiData = require('../db/db.json');
const fs = require('fs');

// npm pkg to create unique non-sequential id's
const { v4: uuidv4 } = require('uuid')

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

    // For developer use: confirm that req was recieved
    console.info(`${req.method} request recieved to add a new note`);

    // de-structure
    const {title, text} = req.body;

    // check to see if a note has a title and text present
    if (title && text) {
        // save new note to a variable
        const newNote = {
            title,
            text,
            note_id: uuidv4(),
        };

        // retrieve the current Note Data and add the new note to that data
        fs.readFile('./db/db.json', 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            }
            else {
                const noteData = JSON.parse(data);

                noteData.push(newNote);

                fs.writeFile('./db/db.json', JSON.stringify(noteData, null, 4),
                (writeErr) => writeErr ? console.error(writeErr) : console.info('Added the new note!'));
            }
        });
        
        const response = {
            status: 'success',
            body: newNote,
        };

        res.status(201).json(response);
    }

    else {
        res.status(500).json('I apologize. We were not able to save your note at this time.')
    }
    
});

// DELETE NOTE
app.delete('api/notes/id:', (req, res) => {

    // confirm req was made to delete note
    console.info(`${req.method} request received to DELETE a note`);

    
})

// If the path does not exist, send index.html (home page) - It is important to call this last so that it does not override the other routes/paths that we have designated
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// tell computer to listen to port for app to run
app.listen(PORT, () =>
    console.log(`Currently listening at http://localhost:${PORT}`)
);