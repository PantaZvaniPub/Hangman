console.log("JS connected");
console.log(movies[456]);

var misteryMovie = "";
var bestLetter = "";
var currentLetter = "";
var moviesWithBestLetter = 0;
var moviesWithCurrentLetter = 0;
var potentialMovies = 0;
var bestLetterPositions = [];
var goButton = document.querySelector("#goButton");
var go = false;
var letterText = "";
var letters = [];

function populateLetters() {
  for (i= 97; i <  123; i++){
    letters.push(String.fromCharCode(i));
  };
};
populateLetters();

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

//making letters on html
for(y=0; y < misteryMovie.length; y++){
  if(misteryMovie[y] === " "){
    letterText= letterText + "<div class=\"space\" id=\"" + y + "\"> </div>";
  } else {
    letterText= letterText + "<div class=\"letter\" id=\"" + y + "\">*</div>";
  };
};
document.querySelector("#misteryMovie").innerHTML= letterText;

function fillOutSpots() {
  letterText = "";
  for(spot=0; spot=misteryMovie.length; spot++){
    if(misteryMovie[y] === " "){
      letterText= letterText + "<div class=\"space\" id=\"" + y + "\"> </div>";
    } else {
      letterText= letterText + "<div class=\"letterG\" id=\"" + y + "\">"+ misteryMovie(spot) +"</div>";
    };
  }
}


//dodaje da se na klik menja * u bestLetter i dodaje u bestLetterPositions
var lett = document.querySelectorAll(".letter")
for( u=0; u<misteryMovie.length; u++){
  lett[u].addEventListener("click", function() {
    if (this.textContent === "*"){
      this.textContent = bestLetter;
      bestLetterPositions.push(Number(this.id));
      this.classList.add("letterG");
      this.classList.remove("letter");
    } else if(this.textContent === bestLetter){
      this.textContent = "*";
      bestLetterPositions.splice(bestLetterPositions.indexOf(Number(this.id)),1);
      this.classList.add("letter");
      this.classList.remove("letterG");
    };
  });
}

//ako ubacim jquery moze ovako
// $(".letter").on("click", function() {this.textContent = "aa"});

// Basic game guessing function
  function game(){
    checkLetters()
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

bestLetterFinder()
alert ( "Click on all positions with the letter: \n" + bestLetter + "\nand click GO in the end")

//
function checkLetters(){
  //if mistery movie doesn't have the letter remove all the movies that have it
  if(bestLetterPositions.length === 0){
    var c = 0
    while(c < potentialMovies.length) {
      if(potentialMovies[c].indexOf(bestLetter) !== -1){
        potentialMovies.splice(c,1);
      } else {c++}
      if( potentialMovies.length == 1){
        alert("the movie is: " + potentialMovies[0] + " , that is a good movie! Reset the page to play again" );
        misteryMovie = potentialMovies[0];
        fillOutSpots();
        return ;
      };
    };
  } else {
    //if the misteryMovie does have the letter
    //change the stars
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
    if( potentialMovies.length === 1 || misteryMovie.indexOf("*") === -1){
      misteryMovie = potentialMovies[0];
      alert("the movie is: " + potentialMovies[0] + " , that is a good movie! Reset the page to play again" );
      fillOutSpots();
      return ;
    };
  };
}
