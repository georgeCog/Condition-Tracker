
var cardWrapper;

const customString = "Custom";
const defStatusEffects = [customString,"Blinded","Charmed","Deafened","Fatigued","Frightened","Grappled","Paralyzed","Poisoned","Prone","Restrained","Stunned","Unconscious"];
var statusEffects = defStatusEffects;

//Function called when all dom elements loaded
function load(){
  cardWrapper = $("#card-wrap");
  if(document.cookie == ""){
    message("Cookies", "This app uses cookies to remember where you left off");
    document.cookie = "accepted=true";
  }else{
    loadCookieState();
  }
}

//Load a state from the cokie substring
function loadCookieState(){
  //status array
  var json_str = getCookie('status-effects');
  if(json_str != ""){
    statusEffects = JSON.parse(json_str);
    updateStatusSelect()
    console.log(statusEffects);
  }
}

//reset possible statusSelect
function resetStats(){
  statusEffects = defStatusEffects;
  updateStatusSelect();
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
  addButton.click(function(){addStatusElement(body,statusSelect.val());});
  return card;
}

//make a close Button
function makeClose(){
  var closeButton = $("<button>").addClass("btn close").attr("aria-label","Close");
  var check = $("<span>").attr("aria-hidden","true").html("&times;");
  closeButton.append(check);
  return closeButton;
}

function addStatusElement(body,name){
  if(name == customString){
    getNewStatus();
  }else{
    body.append(makeStatusElement(name));
  }
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
  // update Cookies
  var json_str = JSON.stringify(statusEffects);
  console.log(json_str);
  createCookie('status-effects', json_str);
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
  name = capitalise(name);
  addPlayerCard(name);
}

//get name of new status
function getNewStatus(){
  $("#add-status-name").val("");
  $("#add-status-toggle").click();
}

//get chosen name and addnew status if unique
function addStatus(){
  var name = $("#add-status-name").val();
  name = capitalise(name);
  var unique = true;
  for (status of statusEffects){
    unique &= !(name.toLowerCase() == status.toLowerCase());
  }
  if(unique){
    statusEffects.push(name);
    updateStatusSelect()
    message("Status Added",name+" added succesfuly");
  }else{
    message("Cannot Add Status","Can't add a status that already exists");
  }
}

//display a message Modal
function message(title,text){
  $("#message-title").text(title);
  $("#message-content").text(text);
  $("#message-toggle").click();
}

//Capitalise word
function capitalise(name){
  var first = name.substring(0,1).toUpperCase();
  var rest = name.substring(1).toLowerCase();
  name = first + rest;
  return name;
}
