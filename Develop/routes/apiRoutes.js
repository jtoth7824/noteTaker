// DEPENDENCIES
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

// task array
var tasks = [];

// setup to get output path of file to write tasks to
const OUTPUT_DIR = path.resolve(__dirname, "../db");
const outputPath = path.join(OUTPUT_DIR, "db.json");

var readTask;

// export all the routes
module.exports = (app) => {
    // api route to GET the notes from file and display on html page
    app.get('/api/notes', (req, res) => {
        // read notes saved from db.json file
        fs.readFile(outputPath, "utf8", (err, jsonString) => {
            // if error occurs reading file display the error
            if (err) {
                console.log("Error reading file from disk:", err);
                return;
            }
            // read the notes and add to array
            try {
                // parse the JSON data read from file
                readTask = JSON.parse(jsonString);
                // if there was data read, then push each task object to the tasks array
                if (!(readTask.length === 0)) {
                    // first clear out existing tasks
                    tasks = [];
                    // loop over all task objects
                    for (let i = 0; i < readTask.length; i++) {
                        // push each task object read into the tasks array
                        tasks.push(readTask[i])
                    }
                }
                // log error if one occurs
            } catch (err) {
                console.log("Error parsing JSON string:", err);
            }
        });
        // return as JSON response the tasks array
        return res.json(tasks);
    });

    // API POST Requests

    // api route for POST to save a new note to db.json file
    app.post('/api/notes', (req, res) => {
        const newTask = {
            title: req.body.title,
            text: req.body.text,
            id: uniqid()
        };
        // save the new task to the tasks array
        tasks.push(newTask);
        // return as JSON response the new task
        res.json(newTask);
        // Write out the updated tasks array to the db.json file
        fs.writeFile(outputPath, JSON.stringify(tasks), (err) =>
            err ? console.error(err) : console.log('Success'));
    });
    // api route for POST to delete a specific note from db.json file
    app.delete('/api/notes/:id', (req, res) => {
        // capture the 'id' parameter of the note to delete
        const deleteId = req.params.id;

        // loop over tasks array to find specific id
        for (let i = 0; i < tasks.length; i++) {
            // check if id to delete matches current task object id in array
            if (deleteId === tasks[i].id) {

                // delete from array the found task
                tasks.splice(i, 1);
            }
        }
        // Write out the updated tasks array to the db.json file
        fs.writeFile(outputPath, JSON.stringify(tasks), (err) =>
            err ? console.error(err) : console.log('Success'));
        // return as JSON response the updated task array
        res.json(tasks);
    });
};