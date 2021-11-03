function Board() {
  let zero = new Space();
  let one = new Space();
  let two = new Space();
  let three = new Space();
  let four = new Space();
  let five = new Space();
  let six = new Space();
  let seven = new Space();
  let eight = new Space();
  this.spaces = [zero, one, two, three, four, five, six, seven, eight];
  one.addPairToCheck(zero, two);
  three.addPairToCheck(zero, six);
  four.addPairToCheck(zero, eight);
  four.addPairToCheck(one, seven);
  four.addPairToCheck(three, five);
  four.addPairToCheck(two, six);
  five.addPairToCheck(two, eight);  
  seven.addPairToCheck(six, eight);

  this.nextMark = 'x';
};

function Space() {
  this.pairsToCheck = [];
  this.value = ""; // x o or blank
}

Space.prototype.addPairToCheck = function(space1, space2) {
  this.pairsToCheck.push([space1, space2]);
};

Board.prototype.checkSpace = function(number) {
  return this.spaces[number].value;
};

Board.prototype.updateSpace = function(number) {
  if (this.checkSpace(number) !== "") {
    return false;
  }
  this.spaces[number].value = this.nextMark;
  return true;
};

Board.prototype.switchMark = function() {
  if (this.nextMark === 'x') {
    this.nextMark = 'o';
  } else {
    this.nextMark = 'x';
  }
};

Board.prototype.checkForWin = function() {
  for(let i of this.spaces){
    if ((i.value != '') && (i.pairsToCheck.length > 0)){
      for(let pair of i.pairsToCheck){
        if ((i.value===pair[0].value)&&(i.value===pair[1].value)){
          return true;
        }
      }
    }
  }
  return false;
};

// UI logic

$(document).ready(function() {
  let board1 = new Board();
  let playing = true;
  let movecount = 0;
  $(".spaceDiv").click(function() {
    let clickedSpace = parseInt(this.id);
    if (playing && (board1.updateSpace(clickedSpace))){
      movecount += 1;
      $("#" + clickedSpace).html("<p>" + board1.spaces[clickedSpace].value + "</p>");
      if (board1.checkForWin()) {
        $("#win").text(board1.nextMark + " wins!");
        playing = false;
      }
      if (movecount === 9) {
        $("#win").text("Draw.");
        playing = false;
      }
      board1.switchMark();
    }

  });

});
