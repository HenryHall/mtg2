console.log("Card Control sourced");

//Define a new HTML tag
var FillText = document.registerElement('fill-text', {
  prototype: Object.create(HTMLElement.prototype)
});

//Append stylesheet
// var head = document.head
//   , link = document.createElement('link');
//
// link.type = 'text/css';
// link.rel = 'stylesheet';
// link.href = 'https://rawgit.com/HenryHall/mtg2/master/public/style.css';
//
// head.appendChild(link);




var myApp=angular.module( 'myApp', [] );

myApp.controller( 'cardDisplay', ['$scope', '$http', '$compile', function($scope, $http, $compile){



  var getCard = function(){


    var elements = document.getElementsByTagName('mtg-text');
    console.log(elements);
    for (var i=0; i<elements.length; i++){
      console.log(i);
      var cardName = elements[i].innerHTML;
      var cardElement = elements[i];
      console.log(cardElement);

      if(cardName==''){
        var cardToSend = {
          name: $scope.searchIn
        };
      } else {
        var cardToSend = {
          name: cardName
        }
      }

      //Start XML Request
      var returnedCard;
      var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
      xmlhttp.open("POST", "/getCard", true);
      xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlhttp.send(JSON.stringify(cardToSend));

      xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState === 4) {
          console.log("ready");
          if(xmlhttp.status === 200) {
            returnedCard = JSON.parse(this.responseText);
            console.log(returnedCard);
            console.log(cardElement);
            var cardURL = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + returnedCard.multiverseid + "&type=card";
            cardElement.innerHTML = "<span class='divstyle0'>" + cardName + "<img class='imgStyle' src='" + cardURL + "'/></span>";
            // $compile(cardElement)($scope);
          } else {
            console.log("fail");
          }
        }
      };//End XML
    }//End For


    // $http({
    //   method: "POST",
    //   url: "/getCard",
    //   data: cardToSend
    // }).then(function(returnedCard){
    //   console.log(returnedCard.data);
      // $scope.displayCard = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + returnedCard.data.multiverseid + "&type=card";
    // });
  };

  getCard();


  // var elements = document.getElementsByTagName('mtg-text');
  // for (var i=0; i<elements.length; i++){
  //   var cardName = elements[i].innerHTML;
  //   var thisCard = null;
  //   var thisCard = getCard(cardName);
  //
  //   // while(thisCard == null){
  //   //   console.log("looping till ready");
  //   // }
  //
  //   elements[i].innerHTML = "<span class='divstyle0'>" + cardName + "<img class='imgStyle' ng-src='{{displayCard}}'/></span>";
  //
  //   $compile(elements[i])($scope);
  // }



}]);
