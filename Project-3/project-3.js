'use strict'

const userInput = document.querySelector('input');
const check = document.querySelector('.check');
let highScore = 0;
let randomNum;
let numTries = 10;
let playGame = true;

// images hidden
$("#game-playing").hide();
$("#game-lose").hide();
$("#game-win").hide();
$("#game-pre").show();

// flashing
$('.btn').hover(function() {
  document.getElementById("flash").style.display = "block";
})
$('.btn').mouseout(function() {
  document.getElementById("flash").style.display = "none";
})

// HIDE THE INPUT BOX
$(".innerBox").hide();

// START GAME
$('.play').click(function() {
    $("#game-playing").show();
    $("#game-lose").hide();
    $("#game-win").hide();
    $("#game-pre").hide();
    $(".innerBox").show();
    $('.play').hide();
    $('.input').removeAttr('disabled', '');
    $('.check').removeAttr('disabled');
    $('.reset').show();
    highScore = 0;
    randomNum = Math.trunc(Math.random() * 100 +1);
    // LOGS NUMBER TO CONSOLE
    console.log(randomNum);
    $('.guessHistory').text('Guess History');
})

if (playGame){
    check.addEventListener('click', function(e){
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

// CHECK TO SEE IF USER'S INPUT WAS VALID
function validateGuess(guess){
    if (isNaN(guess)){
        $('.guessMessage').text('Please enter a number');
    } else if (guess < 0 || guess > 100) {
        $('.guessMessage').text("Input out of range! 1 - 100 only");
    } else {
        //CHECK TO SEE IF THE GAME IS OVER
        if (numTries === 1){
            showGuesses(guess);
            $('.guessMessage').text(`Game Over! Number was ${randomNum}`);
            $("#game-lose").show();
            $("#game-win").hide();
            $("#game-playing").hide();
            document.getElementById('failSound').play();
            // loseSound = new sound("music/lose.mp3");
            // loseSound.play();
            endGame();
            $('.guessHistory').text('Guess History');
            // var body = document.getElementsByTagName('gif');
        } else {
            //Check guess and display if wrong
            checkGuess(guess);
            // DISPLAY THE USER'S GUESS
            showGuesses(guess);
        }
    }
}

// CHECK TO SEE IF USER'S GUESS WAS CORRECT
function checkGuess(guess) {
    if (guess === randomNum) {
        $('.guessMessage').text(`You win! The number was ${randomNum}`);
        $("#game-playing").hide();
        $("#game-lose").hide();
        $("#game-win").show();
        document.getElementById('winSound').play();
        // winSound = new sound("Project3/music/win.mp3");
        // winSound.play();
        if (numTries > highScore) {
            highScore = numTries;
        }
        $('.highScore').text(`Highscore: ${highScore}`);
        $('.score').text(`Score: ${numTries}`);
        endGame();
    } else if (guess > randomNum) {
        $('.guessMessage').text("You're guess is too high. Try again");
        numTries--;
    } else if (guess < randomNum) {
        $('.guessMessage').text("You're guess is too low. Try again");
         numTries--;
    } 
}

// DISPLAY GUESSES & UPDATE SCORE
function showGuesses(guess){
    $('.guessHistory').append(`<li>${guess}</li>`);
    userInput.value = '';
    $('.score').text(`Score: ${numTries}`);
}

// RESET GAME
$('.reset').click(function() {
    // RESET ALL PREVIOUS VARIABLES TO THEIR ORIGINAL VALUES
    numTries = 10;
    $('.score').text(`Score: ${numTries}`);
    userInput.value = '';
    $('.guessHistory').text('Guess History');
    $('.guessMessage').text(`Guess a number`);
    randomNum = parseInt((Math.random()*100)+1);
    console.log(randomNum);
    playGame = true;
    $("#game-playing").show();
    $("#game-lose").hide();
    $("#game-win").hide();
})

// STOP ALL INPUT FUNCTIONALITY
function endGame(){
    //Clear user input
    userInput.value = '';
    //Disable user input button
    $('.input').attr('disabled', '');
    $('.check').attr('disabled', '');
    $('.play').show();
    playGame = false;
    numTries = 10;
    $('.score').text(`Score: ${numTries}`);
       userInput.value = '';
     playGame = true;
}