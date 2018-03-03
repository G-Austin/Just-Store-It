// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 9999; 

// Requiring our models for syncing
var db = require('./models');

// Sets up the link to public directory for static content
// =============================================================
app.use(express.static('public'));

// Sets up the Express app to handle data parsing
// =============================================================
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Import routes and give the server access to them.
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

//sync({force: true}) will wipe out database everytime we restart the server.
// Starts the server to begin listening
// =============================================================
db.sequelize.sync().then(function() {
  app.listen(process.env.PORT || PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
