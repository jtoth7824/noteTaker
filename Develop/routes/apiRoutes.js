// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
const apiNotes = require('../db/db.json');
const fs = require('fs');
const path = require('path');
//const johnNotes = require('../db/john.json');

var hell = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join("./db/", "db.json");

// ROUTING
var chosen;

module.exports = (app) => {
    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get('/api/notes', (req, res) => {

        fs.readFile(path.join(__dirname, '../db/db.json'), "utf8", (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                return;
            }
            try {
                chosen = JSON.parse(jsonString);
                console.log("New Chosen:", chosen);
                if (!(chosen.length === 0)) {
                    hell = [];
                    for (let i = 0; i < chosen.length; i++) {
                        hell.push(chosen[i])
                    }

                }
            } catch (err) {
                console.log("Error parsing JSON string:", err);
            }
        });

        console.log("7th circle of hell:  " + hell);

        return res.json(hell);

    });

    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate JavaScript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post('/api/notes', (req, res) => {
        console.log("inside api notes route");

        console.log(req.body);

        // This works because of our body parsing middleware
        const newCharacter = req.body;

        hell.push(newCharacter);
        res.json(newCharacter);
        // Write out the html page to a file
        fs.writeFile(outputPath, JSON.stringify(hell), (err) =>
            err ? console.error(err) : console.log('Success'));
    });

    app.delete('/api/notes/:id', (req, res) => {
        console.log("inside api delete route");
        const deleteId = parseInt(req.params.id);

        for (let i = 0; i < hell.length; i++) {
            console.log(hell[i].id);
            if (deleteId === hell[i].id) {
                console.log("i = " + i);
                hell.splice(i, 1);
            }
        }
        console.log(hell);
        // Write out the html page to a file
        fs.writeFile(outputPath, JSON.stringify(hell), (err) =>
            err ? console.error(err) : console.log('Success'));
        res.json(hell);
    });

};

//module.exports = hell;