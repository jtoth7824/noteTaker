// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.

//const tableData = require('../data/tableData');
//const waitListData = require('../data/waitinglistData');
const apiNotes = require('../db/db.json');
const fs = require('fs');
const path = require('path');
const johnNotes = require('../db/john.json');

var hell = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join("./db/", "db.json");
//console.log(apiNotes);
// ROUTING

//var json = require('../data/file.json');
// Use `fs` to load JSON file.
//var data = fs.readFileSync(path.join(__dirname, '../data/file.json'));
//var json = JSON.parse(data.toString());
var helpread;
module.exports = (app) => {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get('/api/notes', (req, res) => {
    helpread = apiNotes;
    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (error, data) => {

      if (error) {
        console.log(`Error reading file from disk: ${error}`);
      }
        // parse JSON string to JSON object
        //       const myNotes = JSON.parse(data);
        //     console.log(myNotes);
//        res.json(data);
      helpread = data;
    });

    console.log("readData: " + helpread);
    const chosen = helpread;
    if(!(helpread.length ===0)){
      hell = [];
  
      for (let i = 0; i < chosen.length; i++) {

        //  console.log(chosen[i]);
          hell.push(chosen[i])
        }
    }
    console.log(helpread);

//    const newlike = res.json(apiNotes);
//  hell.push(newlike[0]);    
//  console.log("hell" + hell);
    
//    res.json(apiNotes)
console.log("Chosen:   " + chosen);

/* Check each character routeName and see if the same as "chosen"
 If the statement is true, send the character back as JSON,
 otherwise tell the user no character was found */



console.log("7th circle of hell:  " + hell);

return res.json(hell);
  
  });

//    fs.readFile(path.join(__dirname, '../db/db.json'), 'utf8', (error, data) => {
//      console.log(data);
//      if (error) {
//        console.log(`Error reading file from disk: ${error}`);
//      } else {

        // parse JSON string to JSON object
        //       const myNotes = JSON.parse(data);
        //     console.log(myNotes);
//        res.json(data);
//      }


//    });
//  });
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

    console.log(req.body);
//    hell.forEach(res.body => {
//      hell.push(res.body);
//    });

  // This works because of our body parsing middleware
  const newCharacter = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
//  console.log(newCharacter);

  hell.push(newCharacter);
  res.json(newCharacter);
//console.log("hell post: " + hell);
    //    fs.readFile('data.csv', 'utf8', (error, data) =>
    //      error ? console.error(error) : console.log(data)
    //);
    // Write out the html page to a file
    fs.writeFile(outputPath, JSON.stringify(hell), (err) =>
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

//module.exports = hell;