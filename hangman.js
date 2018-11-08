"use strict";

console.log("JS connected");
console.log(movies2[456]);
/////-----------------------------

////////////////////////////

var misteryMovie = "";
var bestLetter = "";
var currentLetter = "";
var moviesWithBestLetter = 0;
var moviesWithCurrentLetter = 0;
var potentialMovies = [];
var bestLetterPositions = [];
var goButton = document.querySelector("#goButton");
var go = false;
var letterText = "";
var letters = [];
var movies = [];
var gameTitle = "THE HANGMAN";

//uppercase movies
for(let i=0; i<movies2.length; i++){
  var mov = movies2[i].toUpperCase();
movies.push(mov);
}

//make game title on the start
for(let i=0; i < gameTitle.length; i++){
  if(gameTitle[i] === " "){
    letterText= letterText + "<div class=\"space\" id=\"" + i + "\"> </div>";
  } else {
    letterText= letterText + "<div class=\"letterG\" id=\"" + i + "\">" + gameTitle[i] + "</div>";
  };
};
document.querySelector("#misteryMovie").innerHTML= letterText;

function gameStart() {
  //reset of Values
  letters = [];
  // populate letters
  for (let i= 65; i <  91; i++){
    letters.push(String.fromCharCode(i));
  };
  potentialMovies = movies.slice(0);
  misteryMovie = prompt("Enter the mistery movie title using stars for letters, except for special caracters, numbers etc. \n example\:\"Ca$h no.2\" \n enter\:      \"**$* **.2\"");

  //making letters on html
  letterText= "";
  for(let i=0; i < misteryMovie.length; i++){
    if(misteryMovie[i] === " "){
      letterText= letterText + "<div class=\"space\" id=\"" + i + "\"> </div>";
    } else if(misteryMovie[i] === "*"){
      letterText= letterText + "<div class=\"letter\" id=\"" + i + "\"> </div>";
    } else {
      letterText= letterText + "<div class=\"letterG\" id=\"" + i + "\">" + misteryMovie[i] + "</div>";
    };
  };
  document.querySelector("#misteryMovie").innerHTML= letterText;

  //reducing to movies of the right length
  var x= misteryMovie.length;
  for(let i=potentialMovies.length -1; i>-1; i--){
    if(x !== potentialMovies[i].length){
      potentialMovies.splice(i,1);
  }
}

  //dodaje da se na klik menja * u bestLetter i dodaje u bestLetterPositions
  var lett = document.querySelectorAll(".letter")
  for(let i=0; i<lett.length; i++){
    lett[i].addEventListener("click", function() {
      if (this.textContent === " "){
        this.textContent = bestLetter;
        bestLetterPositions.push(Number(this.id));
        this.classList.add("letterG");
        this.classList.remove("letter");
      } else if(this.textContent === bestLetter){
        this.textContent = " ";
        bestLetterPositions.splice(bestLetterPositions.indexOf(Number(this.id)),1);
        this.classList.add("letter");
        this.classList.remove("letterG");
      };
    });
  };
  //first cycle
  bestLetterFinder()
  alert ( "Click on all positions with the letter: \n" + bestLetter + "\nand click GO in the end")
};




function fillOutSpots() {
  letterText = "";
  for(spot=0; spot<misteryMovie.length; spot++){
    if(misteryMovie[spot] === " "){
      letterText= letterText + "<div class=\"space\" id=\"" + spot + "\"> </div>";
    } else {
      letterText= letterText + "<div class=\"letterG\" id=\"" + spot + "\">"+ misteryMovie[spot] +"</div>";
    };
  }
  document.querySelector("#misteryMovie").innerHTML= letterText;
}




//ako ubacim jquery moze ovako
// $(".letter").on("click", function() {this.textContent = "aa"});

// Basic game guessing function
  function game(){
    checkLetters()
    if(potentialMovies.length === 0){return;}
    bestLetterFinder()
    if (misteryMovie.indexOf("*") !== -1){
    alert ( "Click on all positions with the letter: \n" + bestLetter + "\nand click GO in the end")
  };
  };

function bestLetterFinder() {
  //reset values
  bestLetter = letters[0];
  moviesWithBestLetter = 0;
  bestLetterPositions = [];
  //cycling through the letters
  for (let a = 0; a < letters.length; a++){
    currentLetter = letters[a];
    //cycling through the movies to check if they have the letter
    for(let b = 0; b < potentialMovies.length; b++){
      if( potentialMovies[b].indexOf(letters[a]) != -1){
        moviesWithCurrentLetter = moviesWithCurrentLetter + 1;
      };
    };
    //if this letter is better to guess then use it
    if( Math.abs(moviesWithCurrentLetter - potentialMovies.length/2) < Math.abs(moviesWithBestLetter - potentialMovies.length/2) ) {
      bestLetter = currentLetter;
      moviesWithBestLetter = moviesWithCurrentLetter;
    };
    //reset for the next letter
    moviesWithCurrentLetter = 0;
  };
  //remove the letter so we dont guess it again
  letters.splice(letters.indexOf(bestLetter), 1);
};



//
function checkLetters(){
  //if mistery movie doesn't have the letter remove all the movies that have it
  if(bestLetterPositions.length === 0){
    var c = 0
    while(c < potentialMovies.length) {
      if(potentialMovies[c].indexOf(bestLetter) !== -1){
        potentialMovies.splice(c,1);
      } else {c++}
    };
  } else {
    //if the misteryMovie does have the letter
    //change the stars
    for(let i=0; i< bestLetterPositions.length; i++){
      misteryMovie = misteryMovie.substr(0,bestLetterPositions[i]) + bestLetter + misteryMovie.substr(bestLetterPositions[i]+1);
      console.log(misteryMovie);
    };
    //remove movies that don't have the guessed letter in the right places
    for(let i=0; i<bestLetterPositions.length; i++){
      var f=0
      while(f<potentialMovies.length){
        if(potentialMovies[f][bestLetterPositions[i]] !== bestLetter){
          potentialMovies.splice(f,1);
        } else {f++};
      };
    };
    if( potentialMovies.length === 1 || misteryMovie.indexOf("*") === -1){
      misteryMovie = potentialMovies[0];
      alert("The movie is: " + potentialMovies[0] + " , that is a good movie! Reset the page to play again" );
      fillOutSpots();
      return ;
    } else if(potentialMovies.length === 0 ) {
      alert("I'm sorry, I don't know this movie" );
    };
  };
}
