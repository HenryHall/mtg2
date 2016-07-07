var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json({limit: '50mb'}) );
// xmlparser = require('express-xml-bodyparser');
// app.use(xmlparser());
var path = require('path');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/mtgApp');

var mtgSchema = new  mongoose.Schema({
    name: String,
    code: String,
    releaseDate: String,
    cards:{ type : Array , "default" : [] }
  });

  var cardlists = mongoose.model( 'cardlists', mtgSchema );

  app.use( express.static( 'public' ) );

  app.listen( 8000, 'localhost', function( req, res ){
    console.log( 'listening on 8000' );
  });

  app.get( '/', function( req, res ){
    res.sendFile( path.resolve( 'views/index.html' ) );
  });

  app.post( '/getCard', function(req, res){
    console.log("Trying to find: " + req.body.name);
    cardKey = req.body.name.toLowerCase();
    cardlists.find().then(function(setList){
      console.log("Got " + setList.length + " sets.");
      for(var i=0; i<setList.length; i++){
        // console.log("Looking in set: " + setList[i].name);
        for(var j=0; j<setList[i].cards.length; j++){
          // console.log("Looking at: " + setList[i].cards[j].name);
          if(setList[i].cards[j].name.toLowerCase() == cardKey){
            if(setList[i].cards[j].multiverseid !== undefined) {
              console.log("Found the requested card!");
              console.log("sending: " + setList[i].cards[j].name);
              res.send(setList[i].cards[j]);
            }
          }
        }
      }
    }).then(function(){
      console.log("No Card Found!");
      res.send("No Card Found!")
    });


    // res.send("done with: " + req.body.name);
  });
