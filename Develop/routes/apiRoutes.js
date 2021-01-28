// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

//const tableData = require('../data/tableData');
//const waitListData = require('../data/waitinglistData');
const apiNotes = require('../db/db.json');
const fs = require('fs');
const path = require('path');

var uniqid = require('uniqid');

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join("./db/", "john.json");

const john = uniqid();

module.exports = john;
// ROUTING

module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => res.json(apiNotes));

  //  app.get('/api/waitlist', (req, res) => res.json(waitListData));

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post('/api/notes', (req, res) => {
    console.log("inside api notes route");

//    fs.readFile('data.csv', 'utf8', (error, data) =>
//      error ? console.error(error) : console.log(data)
    //);
      // Write out the html page to a file
      fs.appendFile(outputPath, JSON.stringify(req.body), (err) =>
        err ? console.error(err) : console.log('Success'));
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    //    if (tableData.length < 5) {
    //      tableData.push(req.body);
    //      res.json(true);
    //    } else {
    //      waitListData.push(req.body);
    //        res.json(false);
    //    }
  });

  // I added this below code so you could clear out the table while working with the functionality.
  // Don"t worry about it!

  // app.post('/api/clear', (req, res) => {
  //   // Empty out the arrays of data
  //    tableData.length = 0;
  //    waitListData.length = 0;
  //
  //    res.json({ ok: true });
  //  });

  app.delete('/api/notes/:id', (req, res) => {
    console.log("inside api delete route");
  });
};