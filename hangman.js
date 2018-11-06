console.log("JS connected");
console.log(movies[456]);

var letters = [];

function populateLetters() {
  for (i= 97; i <  123; i++){
    letters.push(String.fromCharCode(i));
  };
};
populateLetters();

var misteryMovie = "";
var bestLetter = letters[0];
var currentLetter = letters[0];
var moviesWithBestLetter = 0;
var moviesWithCurrentLetter = 0;
var potentialMovies = 0;
var bestLetterPositions = "";

gameStart()
function gameStart() {
  misteryMovie = prompt("Enter the mistery movie title using stars for letters, except for special caracters, numbers etc. \n example\:\"Ca$h no.2\" \n enter\:      \"**$* **.2\"");
  potentialMovies = movies;
  var x = 0;
  var z = misteryMovie.length;
  while(x < potentialMovies.length){
    if(z !== potentialMovies[x].length){
      potentialMovies.splice(x,1);
    } else { x++};
  };
};

//making letters on html and adding events
for(y=0; y < misteryMovie.length; y++){
  if(misteryMovie[y] === " "){
    document.querySelector("#mysteryMovie").innerHTML+= "<div class=\"space\"> </div>";
  } else {
  document.querySelector("#mysteryMovie").innerHTML+= "<div class=\"letter\">*</div>";
  };
};

//ako ubacim jquery moze ovako
// $(".letter").on("click", function() {this.textContent = "aa"});


var lett = document.querySelectorAll(".letter")
for( u=0; u<misteryMovie.length-1; u++){
  lett[u].addEventListener("click", function() {
    if (this.textContent === "*"){
      this.textContent = bestLetter;
    } else if(this.textContent === bestLetter){
      this.textContent = "*";
    };
  });
}


function bestLetterFinder() {
  //reset values
  bestLetter = letters[0];
  moviesWithBestLetter = 0;
  //cycling through the letters
  for (a = 0; a < letters.length; a++){
    currentLetter = letters[a];
    //cycling through the movies to check if they have the letter
    for(b = 0; b < potentialMovies.length; b++){
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

// If there are stars in the misteryMovie title, keep guessing
while ( misteryMovie.indexOf("*") !== -1) {
  game()
};

// Basic game guessing function
  function game(){
    bestLetterFinder()
    bestLetterPositions = prompt("Is there a letter: \n" + bestLetter + "\nand in what positions (ex. 3,11,15). If there are none, write \"n\"");
    //if mistery movie doesn't have the letter remove all the movies that have it
    if(bestLetterPositions === "n"){
      var c = 0
      while(c < potentialMovies.length) {
        if(potentialMovies[c].indexOf(bestLetter) !== -1){
          potentialMovies.splice(c,1);
        } else {c++}
        if( potentialMovies.length == 1){
          alert("the movie is: " + potentialMovies[0] + " , that is a good movie! Reset the page to play again" );
          misteryMovie = potentialMovies[0];
          return ;
        };
      };
    } else {
      //if the misteryMovie does have the letter
      //turn the input into an array of positions and change the stars
      bestLetterPositions = bestLetterPositions.split(",").map(Number);
      for(d=0; d< bestLetterPositions.length; d++){
        misteryMovie = misteryMovie.substr(0,bestLetterPositions[d]) + bestLetter + misteryMovie.substr(bestLetterPositions[d]+1);
        console.log(misteryMovie);
      };
      //remove movies that don't have the guessed letter in the right places
      for(e=0; e<bestLetterPositions.length; e++){
        var f=0
        while(f<potentialMovies.length){
          if(potentialMovies[f][bestLetterPositions[e]] !== bestLetter){
            potentialMovies.splice(f,1);
          } else {f++};
        };
      };
      if( potentialMovies.length == 1){
        alert("the movie is: " + potentialMovies[0] + " , that is a good movie! Reset the page to play again" );
        misteryMovie = potentialMovies[0];
        return ;
      };
    };
  };

  alert("the movie is: " + misteryMovie + " , that is a good movie! Reset the page to play again" );
