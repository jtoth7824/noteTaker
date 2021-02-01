// DEPENDENCIES
// Series of npm packages that we will use to give our server useful functionality

const express = require('express');

// EXPRESS CONFIGURATION
// This sets up the basic properties for our express server
// Tells node that we are creating an "express" server
const app = express();

// Sets an initial port. We"ll use this later in our listener
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// need these to be able to locate required files in sub-directories
app.use( express.static( __dirname + '/Develop/public' ));
app.use( express.static( __dirname + '/Develop/public/assets/js'));

// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.

require('./Develop/routes/apiRoutes')(app);
require('./Develop/routes/htmlRoutes')(app);

// LISTENER
// The below code effectively "starts" our server

app.listen(PORT, () => {
  console.log(`App listening on PORT: ${PORT}`);
});