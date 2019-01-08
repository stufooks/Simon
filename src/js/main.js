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
const userResponse = []
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
    currentSquare.classList.add('highlighted')
}

const removeHighlight = function(color) {
    let currentSquare = squares[0]
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].id === color) {
            currentSquare = squares[i]
        }
    }
    currentSquare.classList.remove('highlighted')
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
    turn++
}

let button = document.querySelector('header button')
button.addEventListener('click', playGame)



//now get the user's response -------------------------------------------------------------
const clickHandler = function (evt) {
    let guess = evt.target.id
    userResponse.push(guess)
    if (userResponse.length === sequence.length) {
        if (winTester(userResponse)) {
            console.log('winner')
        } else {
            console.log('not quite')
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