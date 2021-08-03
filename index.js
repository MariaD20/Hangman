var secretWords = ["superhero", "wellcode", "javascript", "programming", "orange",
"love", "rectangular", "passion", "poison", "believe", "trust", "faith", "dangerous",
"sky", "unlimited", "future", "bright", "beer","hangman"];
var chosenWord = secretWords[Math.floor(Math.random() * secretWords.length)];
var copyOfChosenWord = chosenWord;
var underline = copyOfChosenWord.replace(/[a-z]/gi, ' _ ');
document.getElementById("underlines").innerHTML = underline;

String.prototype.replaceAt = function(index, replacement) {
return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

var noOfLettersFound = 0;
let tries = 6;
document.getElementById("tries").innerHTML = tries;
let mistakes = 0;
document.getElementById("mistakes").innerHTML = mistakes;

var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
               "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
for (var i = 0; i < letters.length; ++i) {
  var buttonCreated = document.createElement("button");
  buttonCreated.setAttribute("class", "btn btn-outline-dark btn-lg");
  buttonCreated.innerText = letters[i].toUpperCase();
  buttonCreated.setAttribute("id", letters[i]);
  var letterBank = document.getElementById("letterBank");
  letterBank.appendChild(buttonCreated);
  buttonCreated.addEventListener("click", guessTheWord);

  function guessTheWord(id) {
    var flag = 0;
    for (var j = 0; j < chosenWord.length; ++j) {
    if (this.id == chosenWord[j]) {
        underline = underline.replaceAt((j * 3 + 1), chosenWord[j].toUpperCase());
        document.getElementById("underlines").innerHTML = underline;
        ++noOfLettersFound;
        flag = 1;
      } else if (j == chosenWord.length - 1 && flag == 0) {
        ++mistakes;
        document.getElementById("mistakes").innerHTML = mistakes;
      }
    }
    document.getElementById(this.id).setAttribute("disabled", true);
    if (mistakes == tries && noOfLettersFound < chosenWord.length) {
      alert("You just wasted your last chance! You lost!");
    } else if (mistakes <= tries && noOfLettersFound == chosenWord.length) {
      alert("You won! Congratulations!");
    }
  }
}
