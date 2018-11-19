console.log('movieSeparation.js connected');
console.log(moviesBig[456]);

var movies = [];
// var newMovies = [];



// uppercase movies
for(let i=0; i<moviesBig.length; i++){
  var mov = moviesBig[i].toUpperCase();
  movies.push(mov);
};

// removie all movies of wrong length
// for(let i=movies.length -1; i>-1; i--){
//   if( movies[i].length <11){
//     movies.splice(i,1);
//   }
// }

// create arrays
for(let i=0; i<36; i++){
  eval('var movies' + i + '= []');
};

var fileText= ''

//make a string for text file
for(let i=1; i<36; i++){
  fileText = fileText + 'var movies'+ i +' = ['
  for(let u= movies.length-1; u>-1; u--){
    if(movies[u].length === i){
      fileText = fileText+ '\'' + String(movies[u]).replace(/\'/g, "\\'") + '\',';
      // eval('movies'+ i).push(movies[u].replace(/\'/g, "\\'"));
      movies.splice(u,1);
    };
  };
  var fileText = fileText + '];'
};


var hiddenElement = document.createElement('a');

hiddenElement.href = 'data:attachment/text,' + encodeURI(fileText);
hiddenElement.target = '_blank';
hiddenElement.download = 'myFile.txt';
hiddenElement.click();

alert('download started');




// SPARE CODE================================================================

// for(let u= movies.length-1; u>-1; u--){
//   if(movies[u].length < 6){
//     newMovies.push(movies[u].replace(/\'/g, "\\'"));
//     movies.splice(u,1);
//   };
// };

// for (var i = newMovies.length-1; i > -1; i--) {
//   fileText = moviesText + '\'' + String(newMovies[i]) + '\','
// }

// removie all movies of wrong length
// for(let i=movies.length -1; i>-1; i--){
//   if(x !== movies[i].length){
//     movies.splice(i,1);
//   }
// }

//Figure out the longest movie
// var longest = 0;
// for(let i = moviesBig.length-1 ; i>-1; i--){
//   if(moviesBig[i].length > longest){
//     longest = moviesBig[i].length;
//   }
// };
