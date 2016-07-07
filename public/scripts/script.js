console.log("Card Control sourced");

//Append stylesheet
// var head = document.head
//   , link = document.createElement('link');
//
// link.type = 'text/css';
// link.rel = 'stylesheet';
// link.href = 'https://rawgit.com/HenryHall/mtg2/master/public/style.css';
//
// head.appendChild(link);



var getTextCard = function(){

  var elements = document.getElementsByTagName('mtg-text');
  for (var i=0; i<elements.length; i++){
    var cardName = elements[i].innerHTML;
    var cardElement = elements[i];
    var cardToSend = {
      name: cardName
    }

      //Start XML Request
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/getCard", false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(cardToSend));

        if(xmlhttp.status === 200) {
          if(xmlhttp.responseText == "No Card Found!"){
            var cardURL = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366433&type=card";
            cardElement.innerHTML = "<span class='divstyle0'>" + cardName + "<img class='imgStyleText' src='" + cardURL + "'/></span>";
          } else {
            var returnedCard = JSON.parse(xmlhttp.responseText);
            var cardURL = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + returnedCard.multiverseid + "&type=card";
            cardElement.innerHTML = "<span class='divstyle0'>" + cardName + "<img class='imgStyleText' src='" + cardURL + "'/></span>";
          }
        } else {
          console.log("fail");
        }
  }//End For

};//End getTextCard

var getSearch = function(){

  //Gather all mtg-search tags
  var elements = document.getElementsByTagName('mtg-search');
  for (var i=0; i<elements.length; i++){
    var cardName = elements[i].innerHTML;
    var cardElement = elements[i];
    //Create a fresh searchElement
    cardElement.innerHTML = "<div class='divStyle2'><input type='text' placeholder='Card Name'><button type='button' onClick='getCard(this.previousSibling.value, this.parentNode.parentNode)' class='buttonStyle'>Get Card Image</button><img class='imgStyleSearch' src='http://media.wizards.com/2016/images/magic/ewhjdgw/jqghxjuhq_backcard_hxsx.png'</div>";

    if(cardName !== ''){//Initialized with a card
      var searchElement = elements[i];
      getCard(cardName, cardElement);
    }
  }//End For
};//End getSearch

var getCard = function(cardToGet, currentElement){
  console.log("cardToGet: " + cardToGet);
  var cardToSend = {
    name: cardToGet
  }

  //Start XML Request
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "/getCard", false);
  xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  xmlhttp.send(JSON.stringify(cardToSend));

  if(xmlhttp.status === 200) {

    if(xmlhttp.responseText == "No Card Found!"){
      var cardURL = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366433&type=card";
      currentElement.lastChild.lastChild.remove();
      currentElement.lastChild.innerHTML += "<img class='imgStyleSearch' src='" + cardURL + "'/>";
      } else {
      var returnedCard = JSON.parse(xmlhttp.responseText);
      console.log(returnedCard);
      var cardURL = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + returnedCard.multiverseid + "&type=card";

      //This traversing is disgusting, Im so so sorry
      //Remove the current image and create the new one
      currentElement.lastChild.lastChild.remove();
      currentElement.lastChild.innerHTML += "<img class='imgStyleSearch' src='" + cardURL + "'/>";
      }

  } else {
    console.log("fail");
  }
};//End getCard

var getImage = function(){
  var elements = document.getElementsByTagName('mtg-img');
  for (var i=0; i<elements.length; i++){

    var cardToSend = {
      name: elements[i].innerHTML
    }

    //Start XML Request
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "/getCard", false);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify(cardToSend));

    if(xmlhttp.status === 200) {

      if(xmlhttp.responseText == "No Card Found!"){
        var cardURL = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=366433&type=card";
        elements[i].innerHTML = "<img class='imgStyleSearch' src='" + cardURL + "'/>";
      } else {
        var returnedCard = JSON.parse(xmlhttp.responseText);
        console.log(returnedCard);
        var cardURL = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=" + returnedCard.multiverseid + "&type=card";

        elements[i].innerHTML = "<img class='imgStyleSearch' src='" + cardURL + "'/>";
        }
    } else {
      console.log("fail");
    }
  }//End for
}//End getImage

getTextCard(); //Find all card text and update
getSearch(); //Find all of the search boxes
getImage(); //Find all of the images
