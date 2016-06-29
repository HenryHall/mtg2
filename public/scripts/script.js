console.log("Card Control sourced");

var myApp=angular.module( 'myApp', [] );
//
myApp.controller( 'cardController', ['$scope', '$http', function($scope, $http){
  console.log("In cardController");

var cardLibrary;
var i = 0;

  $scope.doIt = function(){

    console.log("did it");

    $http({
      method: 'GET',
      url: 'https://raw.githubusercontent.com/HenryHall/MtgJsonTest/gh-pages/JSon/AllSets.json'
    }).then(function(data){
      cardLibrary = data;
      // console.log(cardLibrary[i]);
      for (set in cardLibrary.data){
        console.log(cardLibrary.data[set]);
        makeSet(cardLibrary.data[set]);
      }
      console.log("End");
    });
  };




  var makeSet = function(singleSet){
    console.log(singleSet);
    $http({
      method: 'POST',
      url: '/createData',
      data: singleSet
    }).then(
      // console.log("Sent: " + singleSet);
    );
  };

}]);

myApp.controller( 'cardDisplay', ['$scope', '$http', function($scope, $http){

  $scope.getCard = function(cardName){
    console.log("In cardDisplay with: " + cardName);
    var cardToSend = {
      name: cardName
    };

    console.log(cardToSend, cardToSend.name);

    $http({
      method: "GET",
      url: "/getCard",
      data: cardToSend
    }).then(function(returnedCard){
      console.log(returnedCard);
      // return "'http://gatherer.wizards.com/Pages/Card/Details.aspx?multiverseid=' + returnedCard";
    });
  };

}]);
