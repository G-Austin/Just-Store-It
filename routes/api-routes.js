
// Dependencies
// =============================================================
var db = require("../models");
var pg = require('pg');


// Routes
// =============================================================
module.exports = function(app) {


    app.get('/db', function (request, response) {
        pg.connect(process.env.DATABASE_URL, function(err, client, done) {
            client.query('SELECT * FROM VirtualBox', function(err, result) {
                done();
                if (err)
                { console.error(err); response.send("Error " + err); }
                else
                { response.render('pages/db', {results: result.rows} ); }
            });
        });
    });


    app.get("/api/all/", function(req, res) {
    db.VirtualBox.findAll({}).then(function(dbVirtualBox) {
        res.json(dbVirtualBox);
      });
  });

  app.get("/api/:virtualBox", function(req, res) {
    db.VirtualBox.findAll({
      where: {
        box_name: req.params.virtualBox
      }
    })
    .then(function(dbVirtualBox) {
    res.json(dbVirtualBox);
    });
  });

  //Route for posting new boxes
  app.post("/api/new", function(req, res) {
    console.log("VirtualBox Data:");
    console.log(req.body);
    db.VirtualBox.create({
      box_name: req.body.box_name,
      priority: req.body.priority,
      item_description: req.body.item_description,
      category: req.body.category,
      address: req.body.address,
      latitude: req.body.lat,
      longitude: req.body.lng
    });
  });

  //Update
  app.post("/api/update", function(req, res) {
    console.log("VirtualBox Data:");
    console.log(req.body);
    db.VirtualBox.update({
      priority: req.body.priority,
      item_description: req.body.item_description,
      category: req.body.category,
      address: req.body.address
    }, {
      where: {
        box_name: req.body.box_name
      }
    }).then(function(dbVirtualBox) {
      res.json(dbVirtualBox);
    });
  }); 

  //Update an item
  app.post("/api/updateItem", function(req, res) {
    console.log("VirtualBox Data:");
    console.log(req.body);
    db.VirtualBox.update({
      item_description: req.body.item_description
    }, {
      where: {
        box_name: req.body.box_name
      }
    }).then(function(dbVirtualBox) {
      res.json(dbVirtualBox);
    });
  }); 

  //Delete
  app.post('/api/delete', function(req, res) {
    console.log("VirtualBox Data:");
    console.log(req.body)
    db.VirtualBox.destroy({
      where: {
        box_name: req.body.box_name
      }
    });
  }); 

    //Delete
  app.post('/api/deleteItem', function(req, res) {
    console.log("VirtualBox Data:");
    console.log(req.body)
    db.VirtualBox.destroy({
      item_description: req.body.item_description
    }, {
      where: {
        box_name: req.body.box_name
      }
    });
  }); 
}; //Module Export



