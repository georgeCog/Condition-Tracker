
var cardWrapper;

const customString = "Custom";
var statusEffects = [customString,"Blinded","Charmed","Deafened","Fatigued","Frightened","Grappled","Paralyzed","Poisoned","Prone","Restrained","Stunned","Unconscious"];

//Function called when all dom elements loaded
function load(){
  cardWrapper = $("#card-wrap");
  //addPlayerCard("Billy");
  //addPlayerCard("Anna");
  //addPlayerCard("Trevor");
  //addPlayerCard("Mary");
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
  var closeButton = makeClose();
  header.append(closeButton);
  //Make body
  var body = $("<div class='card-body'>");
  //Make footer
  var footer = $("<div class='card-footer'>");
  var addButton = $("<button>").addClass("btn").text("Add");
  var statusSelect = makeStatusSelect();
  footer.append(addButton).append(statusSelect);
  //Add all three to the card
  card.append(header).append(body).append(footer);
  //Add Self referential button functions
  closeButton.click(function(){removeCard(card);});
  addButton.click(function(){body.append(makeStatusElement(statusSelect.val()));});
  return card;
}

//make a close Button
function makeClose(){
  var closeButton = $("<button>").addClass("btn close").attr("aria-label","Close");
  var check = $("<span>").attr("aria-hidden","true").html("&times;");
  closeButton.append(check);
  return closeButton;
}

//Generate a check box element
function makeStatusElement(stat){
  var element = $("<div>").addClass("status-element").addClass("big-checkbox");
  var checkBox = $("<input type='checkbox'>");
  var title = $("<label>").text(stat);
  var closeButton = makeClose();
  element.append(checkBox).append(title).append(closeButton);
  closeButton.click(function(){element.remove()});
  return element;
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

//Get a name for a new player
function getName(){
  $("#create-player-name").val("");
  $("#create-player-toggle").click();
}

//Get the chosen name and ann the new player
function addCard(){
  var name = $("#create-player-name").val();
  addPlayerCard(name);
}
