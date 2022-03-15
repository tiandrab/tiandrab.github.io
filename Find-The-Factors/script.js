'use strict'

// INITIALIZE VARIABLES
const userInput = document.querySelector('input');
const go = document.querySelector('.button');
const reset = document.querySelector('.reset');

// SUBMIT NUMBER
go.addEventListener('click', function(e){
    e.preventDefault();
    const num = parseInt(userInput.value);
    validateInput(num)
});


// CHECK TO SEE IF USER'S INPUT WAS VALID
function validateInput(num){
    if (isNaN(num)){
        $('h3').text('PLEASE ENTER A NUMBER!');
        document.querySelector("H3").style.color = "red";
    } else {
        findFactors(num);
        reset.disabled = false;
        go.disabled = true;
    }
}

// FIND FACTORS
function findFactors(num) {
    $('.factors').append(`<b>FACTORS OF ${num}</b>`);
    for(let i = 0; i <= num; i++){
        if (num % i === 0){
            $('.factors').append(`<li><b>${i}</b></li>`);
        }
    }
}

// RESET 
reset.addEventListener('click', function(e){
    reset.disabled = true;
    // RESET ALL PREVIOUS VARIABLES TO THEIR ORIGINAL VALUES
    e.preventDefault();
    $('h3').text('Enter Number Below:');
    document.querySelector("H3").style.color = "chocolate";
    userInput.value = '';
    $('.factors').empty();
    go.disabled = false;
})
