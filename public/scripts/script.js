console.log("Card Control sourced");

var myApp=angular.module( 'myApp', [] );
//
// myApp.controller( 'cardController', ['$scope', '$http', function($scope, $http){
//   console.log("In cardController");
//
// var cardLibrary;
// var i = 0;
//
//   $scope.doIt = function(){
//
//     console.log("did it");
//
//     $http({
//       method: 'GET',
//       url: 'https://raw.githubusercontent.com/HenryHall/MtgJsonTest/gh-pages/JSon/AllSets.json'
//     }).then(function(data){
//       cardLibrary = data;
//       // console.log(cardLibrary[i]);
//       for (set in cardLibrary.data){
//         console.log(cardLibrary.data[set]);
//         makeSet(cardLibrary.data[set]);
//       }
//       console.log("End");
//     });
//   };
//
//
//
//
//   var makeSet = function(singleSet){
//     console.log(singleSet);
//     $http({
//       method: 'POST',
//       url: '/createData',
//       data: singleSet
//     }).then(
//       // console.log("Sent: " + singleSet);
//     );
//   };
//
// }]);

myApp.controller( 'cardDisplay', ['$scope', '$http', function($scope, $http){

  // $scope.imgStyle = {
  //
  // };

  $scope.divstyle0 = {
    "z-index" : "100"
  }

  $scope.divStyle1 = {
  };

  $scope.divStyle2 = {
    "height" : "400px",
    "width" : "250px",
    "text-align" : "center",
    "border" : "2px solid black",
    "padding" : "10px"
  };

  $scope.buttonStyle = {

  	"-moz-box-shadow" :"inset 0px 1px 0px 0px #bee2f9",
  	"-webkit-box-shadow" : "inset 0px 1px 0px 0px #bee2f9",
  	"box-shadow" : "inset 0px 1px 0px 0px #bee2f9",
  	"background" : "-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #63b8ee), color-stop(1, #468ccf))",
  	"background" : "-moz-linear-gradient(top, #63b8ee 5%, #468ccf 100%)",
  	"background" : "-webkit-linear-gradient(top, #63b8ee 5%, #468ccf 100%)",
  	"background" : "-o-linear-gradient(top, #63b8ee 5%, #468ccf 100%)",
  	"background" : "-ms-linear-gradient(top, #63b8ee 5%, #468ccf 100%)",
  	"background" : "linear-gradient(to bottom, #63b8ee 5%, #468ccf 100%)",
  	"filter:progid" : "DXImageTransform.Microsoft.gradient(startColorstr='#63b8ee', endColorstr='#468ccf',GradientType=0)",
  	"background-color" : "#63b8ee",
  	"-moz-border-radius" : "6px",
  	"webkit-border-radius" : "6px",
  	"border-radius" : "6px",
  	"border " : "1px solid #3866a3",
  	"display" : "inline-block",
  	"cursor" : "pointer",
  	"color" : "#14396a",
  	"font-family" : "Arial",
  	"font-size" : "15px",
  	"font-weight" : "bold",
  	"padding" : "6px 24px",
  	"text-decoration" : "none",
  	"text-shadow" : "0px 1px 0px #7cacde",
    "margin" : "10px"

  };
  // .myButton:hover {
  // 	background:-webkit-gradient(linear, left top, left bottom, color-stop(0.05, #468ccf), color-stop(1, #63b8ee));
  // 	background:-moz-linear-gradient(top, #468ccf 5%, #63b8ee 100%);
  // 	background:-webkit-linear-gradient(top, #468ccf 5%, #63b8ee 100%);
  // 	background:-o-linear-gradient(top, #468ccf 5%, #63b8ee 100%);
  // 	background:-ms-linear-gradient(top, #468ccf 5%, #63b8ee 100%);
  // 	background:linear-gradient(to bottom, #468ccf 5%, #63b8ee 100%);
  // 	filter:progid:DXImageTransform.Microsoft.gradient(startColorstr='#468ccf', endColorstr='#63b8ee',GradientType=0);
  // 	background-color:#468ccf;
  // }
  // .myButton:active {
  // 	position:relative;
  // 	top:1px;
  // }


  // };





  $scope.getCard = function(cardIn){

    if(cardIn==''){
      var cardToSend = {
        name: $scope.searchIn
      };
    } else {
      var cardToSend = {
        name: cardIn
      }
    }



    console.log(cardToSend, cardToSend.name);

    $http({
      method: "POST",
      url: "/getCard",
      data: cardToSend
    }).then(function(returnedCard){
      console.log(returnedCard.data);
      $scope.displayCard = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + returnedCard.data.multiverseid + "&type=card";
    });
  };

}]);
