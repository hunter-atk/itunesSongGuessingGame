
var songIds = ["995535015", "966411602", "823593456", "956689796", "943946671",
                "982388023", "907242704", "201281527", "656801339", "910038357",
                "250038575", "878000348",  "794095205",  "1645339",  "400835962",
                "325618",  "169003415",  "51958108",
                "192688540", "684811768", "344799464", "217633921",
                "192811017", "71068886", "640047583", "517438248",
               "656479859", "310237", "991390352", "901614155",
                "344799727", "162337613", "121695005", "159293848", "305118379" ];

var newsongIds = songIds;
var currentCorrect = 0;
var currentWrong = 0;

function songGuessingGame(){

  var randomId = newsongIds[Math.floor(Math.random()*newsongIds.length)];

 fetch(`https://itunes.apple.com/search?term=${randomId}`)
  .then(function(res){
    return res.json();
  })
  .then(function(data){
    //console.log(data.results[0]);
    var songPlay = document.createElement("audio");
    var docBody = document.getElementsByTagName('body')[0];
    var replay = document.createElement('button');
    var mainContainer = document.createElement('container');
    var songContainer = document.createElement('container');
    var replayContainer = document.createElement('container');
    var inputContainer = document.createElement('container');
    var inputField = document.createElement('input');
    var inputSubmit = document.createElement('input');
    var scoreContainer = document.createElement('container');
    var statsContainer = document.createElement('container');
    var artistNameDiv = document.createElement('div');
    var albumNameDiv = document.createElement('div');
    var songNameDiv = document.createElement('div');
    var albumArtDiv = document.createElement('img');
    var albumArt = "";
    var artistName = data.results[0].artistName;
    var albumName = data.results[0].collectionName;
    var songName = data.results[0].trackName;
    var resultContainer = document.createElement('container');
    docBody.appendChild(mainContainer);
    //console.log(docBody);

    mainContainer.appendChild(scoreContainer);
    mainContainer.appendChild(songContainer);
    mainContainer.appendChild(inputContainer);
    mainContainer.appendChild(replayContainer);
    mainContainer.appendChild(resultContainer);
    mainContainer.appendChild(statsContainer);

    statsContainer.appendChild(artistNameDiv);
    statsContainer.appendChild(songNameDiv);
    statsContainer.appendChild(albumNameDiv);
    statsContainer.appendChild(albumArtDiv);

    scoreContainer.setAttribute("class", "scoreText");
    scoreContainer.innerText = "Your current score: " + currentCorrect;

    inputContainer.appendChild(inputField);
    inputField.setAttribute("type", "text");
    inputField.setAttribute("placeholder", "Guess the song, album, or artist!");
    inputField.setAttribute("id", "input_field");
    inputContainer.appendChild(inputSubmit);
    inputSubmit.setAttribute("type", "submit");
    inputSubmit.setAttribute("value", "GUESS")
    inputSubmit.setAttribute("id", "input_submit")

    songContainer.setAttribute("class", "songContainer");
    inputContainer.setAttribute("class", "inputContainer");
    replayContainer.setAttribute("class", "replayContainer");
    mainContainer.setAttribute("class", "mainContainer");

    inputSubmit.addEventListener('click', function(ev){
      if (inputField.value == songName || inputField.value == albumName || inputField.value == artistName){
        console.log("You guessed right!");
        currentCorrect++;
        scoreContainer.innerText = "Your current score: " + currentCorrect;
        artistNameDiv.innerText = "Artist: " + artistName;
        songNameDiv.innerText = "Track: " + songName;
        albumNameDiv.innerText = "Album: " + albumName;
        albumArt = data.results[0].artworkUrl100;
        albumArtDiv.setAttribute("src", albumArt);
        resultContainer.innerText = "CORRECT!";
        console.log(currentCorrect);
      } else {
        console.log("Sorry, guess again...")
        currentWrong++;
        resultContainer.innerText = "Sorry, guess again...";
      }
    })

    replay.innerText = "Next song!";
    replay.addEventListener('click', function(ev){
        // songPlay.remove();
        // replay.remove();
        // inputField.remove();
        // inputSubmit.remove();
        // currentCorrect.remove();
        // artistName.remove();
        // albumName.remove();
        // songName.remove();
        // artistNameDiv.remove();
        // songNameDiv.remove();
        // albumNameDiv.remove();
        // albumArtDiv.remove();
         mainContainer.remove();
    		songGuessingGame();
    	})

    songContainer.appendChild(songPlay);
    replayContainer.appendChild(replay);

    var sourceTag = document.createElement("source");
    songPlay.appendChild(sourceTag);
    sourceTag.setAttribute("src", `${data.results[0].previewUrl}`);
    sourceTag.setAttribute("type", "audio/mpeg");
    songPlay.setAttribute("controls", "");
    songPlay.setAttribute("autoplay", "");
    //console.log(docBody);
  })

  var index = newsongIds.indexOf(randomId);
  newsongIds.splice(index, 1);

}

songGuessingGame();


// // NOTE: Working code below this line.
// var songIds = ["995535015", "966411602", "823593456", "956689796", "943946671",
//                 "982388023", "907242704", "201281527", "656801339", "910038357",
//                 "250038575", "878000348",  "794095205",  "1645339",  "400835962",
//                 "325618",  "169003415",  "51958108",
//                 "192688540", "684811768", "344799464", "217633921",
//                 "192811017", "71068886", "640047583", "517438248",
//                "656479859", "310237", "991390352", "901614155",
//                 "344799727", "162337613", "121695005", "159293848", "305118379" ];
//
// var newsongIds = songIds;
//
// function songGuessingGame(){
//
//   var randomId = newsongIds[Math.floor(Math.random()*newsongIds.length)];
//  fetch(`https://itunes.apple.com/search?term=${randomId}`)
//   .then(function(res){
//     return res.json();
//   })
//   .then(function(data){
//     var songPlay = document.createElement("audio");
//     var docBody = document.getElementsByTagName('body')[0];
//     var replay = document.createElement('button');
//     replay.innerText = "REPLAY!";
//     replay.addEventListener('click', function(ev){
//         songPlay.remove();
//         replay.remove();
//     		songGuessingGame();
//     	})
//
//     docBody.appendChild(songPlay);
//     docBody.appendChild(replay);
//
//     var sourceTag = document.createElement("source");
//     songPlay.appendChild(sourceTag);
//     sourceTag.setAttribute("src", `${data.results[0].previewUrl}`);
//     sourceTag.setAttribute("type", "audio/mpeg");
//     songPlay.setAttribute("controls", "");
//     songPlay.setAttribute("autoplay", "");
//   })
//
//   var index = newsongIds.indexOf(randomId);
//   newsongIds.splice(index, 1);
// }
//
// songGuessingGame();
