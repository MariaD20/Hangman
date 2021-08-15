var chosenWord, underline;
var letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
               "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var noOfLettersFound = 0;
const tries = 10;
document.getElementById("tries").innerHTML = tries;
var mistakes = 0;
document.getElementById("mistakes").innerHTML = mistakes;

String.prototype.replaceAt = function(index, replacement) {
  return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function chooseWord() {
  var secretWords = ["superhero", "wellcode", "javascript", "programming", "orange",
  "love", "rectangular", "passion", "poison", "believe", "trust", "faith", "dangerous",
  "sky", "unlimited", "future", "bright", "beer","hangman"];
  chosenWord = secretWords[Math.floor(Math.random() * secretWords.length)];
  underline = chosenWord.replace(/[a-z]/gi, ' _ ');
  document.getElementById("underlines").innerHTML = underline;
  return underline, chosenWord;
}

function generateButtons() {
  for (var i = 0; i < letters.length; ++i) {
    var buttonCreated = document.createElement("button");
    buttonCreated.setAttribute("class", "btn btn-outline-dark btn-lg");
    buttonCreated.innerText = letters[i].toUpperCase();
    buttonCreated.setAttribute("id", letters[i]);
    var letterBank = document.getElementById("letterBank");
    letterBank.appendChild(buttonCreated);
    buttonCreated.onclick = function() {
      guessTheLetter(this.id);
    }
  }
}

function guessTheLetter(letter) {
  var flag = 0;
  for (var j = 0; j < chosenWord.length; ++j) {
    if (letter == chosenWord[j]) {
      ++noOfLettersFound;
      underline = underline.replaceAt((j * 3 + 1), chosenWord[j].toUpperCase());
      document.getElementById("underlines").innerHTML = underline;;
      flag = 1;
    } else if (j == chosenWord.length - 1 && flag == 0) {
      ++mistakes;
      document.getElementById("mistakes").innerHTML = mistakes;
    }
  }
  document.getElementById(letter).setAttribute("disabled", true);
    if (mistakes == tries && noOfLettersFound < chosenWord.length) {
      displayModal("You just lost", "But...you can play once again!", "block");
    } else if (noOfLettersFound == chosenWord.length) {
      displayModal("Congratulations!", "You just won! I encourage you to play again!", "block");
    }
}

function displayModal(modalTitleText, modalBodyText, myModalStyle) {
  document.getElementById("modalTitle").innerHTML = modalTitleText;
  document.getElementById("modalBody").innerHTML = modalBodyText;
  document.getElementById("myModal").style.display = myModalStyle;
}

chooseWord();
generateButtons();
