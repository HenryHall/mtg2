var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json({limit: '50mb'}) );
// app.use(bodyParser.urlencoded({extended: false}));
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
    // var query = cardlists.findOne({name: "Limited Edition Alpha"});
    // cardlists.findOne({name: "Shadows Over Innistrad"}).then(function(data){res.send(data)});
    // cardlists.findOne({name: "Ice Age"}).then(function(data){res.send(data)});
    cardlists.find().then(function(setList){
      console.log("Got " + setList.length + " sets.");
      for(var i=0; i<setList.length; i++){
        console.log("Looking in set: " + setList[i].name);
        for(var j=0; j<setList[i].cards.length; j++){
          console.log("Looking at: " + setList[i].cards[j].name);
          if(setList[i].cards[j].name.toLowerCase() == cardKey){
            console.log("Found the requested card!");
            res.send(setList[i].cards[j]);
          }
        }
      }
    }).then(function(){res.send("No Card Found!")});


    // res.send("done with: " + req.body.name);
  });

  app.post('/createData', function(req, res){
    console.log("/createData got: " + req.body.name);

    var newCard = req.body;

    var newRecord = cardlists(newCard);
    newRecord.save();
    console.log(newRecord.name + " newRecord");
    res.send("db Created");
  });
