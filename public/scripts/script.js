console.log("Card Control sourced");

//Define a new HTML tag
var FillText = document.registerElement('fill-text', {
  prototype: Object.create(HTMLElement.prototype)
});

var myApp=angular.module( 'myApp', [] );

myApp.controller( 'cardDisplay', ['$scope', '$http', '$compile', function($scope, $http, $compile){


  $scope.getCard = function(cardIn, elementNumber){

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

//Allow the img to follow the mouse
  $scope.showPopover = function(mouseEvent) {
    if (!mouseEvent)
      {
        mouseEvent = window.event;
      }
      $scope.field.left = mouseEvent.pageX + 'px';
      $scope.field.top = mouseEvent.pageY+ 'px';
    return $scope.hover = !$scope.hover;
  };


  var elements = document.getElementsByTagName('mtg-text');
  console.log("getting tags");
  for (var i=0; i<elements.length; i++){
    var currentCard = elements[i].innerHTML;
    var spanWidth = elements.length;

    $scope.getCard(currentCard, i);

    elements[i].innerHTML = "<span ng-mouseenter='hover=true' ng-mouseleave='hover=false'><span ng-style='divstyle0'>" + currentCard + "</span><img ng-style='imgStyle' ng-show='hover' ng-src='{{displayCard}}'/></span>";
    // elements[i].innerHTML = "<span ng-mouseenter='showPopover($event)' ng-mouseleave='showPopover()'><span ng-style='divstyle0'>" + currentCard + "</span><img ng-style='{left:field.left,top:field.top}' ng-show='hover' ng-src='{{displayCard}}'/></span>";

    $compile(elements[i])($scope);
  }



}]);
