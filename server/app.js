var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json({limit: '50mb'}) );
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/mtgApp');

var mtgSchema = new  mongoose.Schema({
    name: String,
    code: String,
    releaseDate: String,
    cards:{ type : Array , "default" : [] }
      // [{
      //   cmc: Number,
      //   colors: String,
      //   flavor: String,
      //   manaCost: String,
      //   multiverseid: Number,
      //   name: String,
      //   type: String,
      //   types: Array
      // }]
  });

  var cardlist = mongoose.model( 'cardlist', mtgSchema );

  app.use( express.static( 'public' ) );

  app.listen( 8000, 'localhost', function( req, res ){
    console.log( 'listening on 8000' );
  });

  app.get( '/', function( req, res ){
    res.sendFile( path.resolve( 'views/index.html' ) );
  });

  app.get( '/getCard', function(req, res){
    console.dir(req.body);
    console.log("Trying to find: " + req.body);
    // var query = cardlist.findOne({"name": "Shadows over Innistrad"});
    res.send("done with: " + req.body.name);
  });

  app.post('/createData', function(req, res){
    console.log("/createData got: " + req.body.name);

    var newCard = req.body;

    var newRecord = cardlist(newCard);
    newRecord.save();
    console.log(newRecord.name + " newRecord");
    res.send("db Created");
  });
