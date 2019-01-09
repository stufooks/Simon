//set up constants
const squares = document.querySelectorAll('.squares-container .game-square')
const colors = [
    'green',
    'red',
    'yellow',
    'blue'
]
let turn = 1
let sequence = []
let userResponse = []
let i = 0

//create random array of colors -------------------------------------------------------------

const randomizer = function () {
    for (let i = 0; i < (turn + 2); i++) {
        let random = Math.random()
        let length = colors.length
        let index = Math.floor(length * random)
        sequence.push(colors[index])
    }
}

// const randomizer = require('./randomizer.js')
// const sequence = randomizer.randomizer(colors, turn)
// console.log(sequence)

// change borders of game squares in order of the sequence ------------------------------------
const highlight = function(color) {
    let currentSquare = squares[0]
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].id === color) {
            currentSquare = squares[i]
        }
    }
    currentSquare.style.opacity = 1;

}

const removeHighlight = function(color) {
    let currentSquare = squares[0]
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].id === color) {
            currentSquare = squares[i]
        }
    }
    currentSquare.style.opacity = .3
}

const gameLoop = function () {
    setTimeout( function () {
        let currentColor = sequence[i]
        console.log(currentColor)
        highlight(currentColor)
        setTimeout( function () {
            removeHighlight(currentColor)
        }, 800)
        i++
        if (i < sequence.length) {
            gameLoop()
        }
   }, 1300)
}

const playGame = function () {
    sequence = []
    randomizer()
    console.log(sequence)
    i = 0
    gameLoop()
}

let button = document.querySelector('button')
button.addEventListener('click', playGame)



//now get the user's response -------------------------------------------------------------
let responsesContainer = document.querySelector('.responses-container')

const clickHandler = function (evt) {
    let guess = evt.target.id
    userResponse.push(guess)

    let p = document.createElement('P')
    p.innerHTML = guess
    responsesContainer.appendChild(p)

    if (userResponse.length >= sequence.length) {
        if (winTester(userResponse)) {
            setTimeout( function () {alert("Correct! Press 'Ready' again to try the next level.")}, 200)
            setTimeout( function () {clearResponses()}, 200)
            turn++
        } else {
            setTimeout( function() {alert("Not quite. Guess again or press 'Ready' for a new sequence.")}, 200)
            setTimeout( function() {clearResponses()}, 200)
        }
    }
}

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', clickHandler)
}

//now compare user's response to the sequence -----------------------------------------------
const winTester = function (userResponse) {
    let count = 0
    for (let i = 0; i < sequence.length; i++) {
        if (userResponse[i] === sequence[i]) {
            count++
        }
    }
    return count === sequence.length
}

const clearResponses = function () {
    for (let i = 0; i < userResponse.length; i++) {
        let p = document.querySelector('p')
        responsesContainer.removeChild(p)
    }
    userResponse = []
}