
var cardWrapper;

const customString = "Custom";
var statusEffects = [customString,"Blinded","Charmed","Deafened","Fatigued","Frightened","Grappled","Paralyzed","Poisoned","Prone","Restrained","Stunned","Unconscious"];

//Function called when all dom elements loaded
function load(){
  cardWrapper = $("#card-wrap");
  addPlayerCard("Billy");
  addPlayerCard("Anna");
}

//Add player card with specified atributes to page
function addPlayerCard(name){
  var newCard = makeCard(name);
  cardWrapper.append(newCard);
}

//Generate a player card dom elemnt
function makeCard(name){
  var card = $("<div class='card player-card'>");
  //Make header
  var header = $("<div class='card-header'>");
  header.append($("<span>").addClass("player-name").text(name));
  var closeButton = $("<button>").addClass("btn close").attr("aria-label","Close");
  var check = $("<span>").attr("aria-hidden","true").html("&times;");
  closeButton.append(check);
  header.append(closeButton);
  //Make body
  var body = $("<div class='card-body'>");
  //Make footer
  var footer = $("<div class='card-footer'>");
  footer.append(makeStatusSelect());
  //Add all three to the card
  card.append(header).append(body).append(footer);
  //Add close function to delete close button
  closeButton.click(function(){removeCard(card);});
  return card;
}

//Generate a select box
function makeStatusSelect(){
  var selectBox = $("<select>").addClass("statusSelect custom-select");
  fillStatusSelect(selectBox);
  return selectBox;
}

//Update the contents of all the status select boxes
function updateStatusSelect(){
  var selectBox;
  var allStatusBoxes = $(".statusSelect");
  for(selectBox of allStatusBoxes){
    $(selectBox).empty();
    fillStatusSelect($(selectBox));
  }
}

//fill the given status select with the correct options
function fillStatusSelect(selectBox){
  var status;
  for (status of statusEffects){
    var option = $("<option value='"+ status +"'>").text(status);
    selectBox.append(option);
  }
  return selectBox;
}

//check a player wants to remove a card and if so remove it
function removeCard(card){
  var name = card.find(".player-name").text();
  $("#player-delete-name").text(name);
  $("#delete-confirm-button").click(function(){card.remove();});
  $("#delete-chceck-toggle").click();
}

function getName(){
  $("#create-player-toggle").click();
}

function addCard(){
  var name = $("#create-player-name").val();
  addPlayerCard(name);
}
