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
let speed = 800

//create random array of colors -------------------------------------------------------------

const randomizer = function () {
    for (let i = 0; i < (turn + 2); i++) {
        let random = Math.random()
        let length = colors.length
        let index = Math.floor(length * random)
        sequence.push(colors[index])
    }
}

// function to add a random color to the sequence after each turn

const addRandom = function () {
    let random = Math.random()
    let length = colors.length
    let index = Math.floor(length * random)
    sequence.push(colors[index])
}

// change borders of game squares in order of the sequence ------------------------------------
const highlight = function(color) {
    let currentSquare = squares[0]
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].id === color) {
            currentSquare = squares[i]
        }
    }
    currentSquare.style.opacity = 1

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
        }, speed)
        i++
        if (i < sequence.length) {
            gameLoop()
        }
   }, (speed + 250))
}

const playGame = function () {
    if (turn === 1) {
        sequence = []
        randomizer()
    }
    console.log(sequence)
    i = 0
    gameLoop()
}

let readyButton = document.querySelector('.ready-container button')
readyButton.addEventListener('click', playGame)



//now get the user's response -------------------------------------------------------------
let responsesContainer = document.querySelector('.responses-container')

const clickHandler = function (evt) {
    let guess = evt.target.id
    userResponse.push(guess)

    highlight(guess)
    setTimeout(() => {removeHighlight(guess)}, 400)

    if (userResponse.length >= sequence.length) {
        if (turn != 1) {
            if (winTester(userResponse)) {
                setTimeout( function () {alert("Correct! Press 'Ready' again to try the next level.")}, 410)
                setTimeout( function () {clearResponses()}, 410)
                turn++
                updateLevel()
                addRandom()
            } else {
                setTimeout( function() {alert("Not quite. Guess again, press 'Ready' to replay the sequence, or press 'Reset Game' to start over.")}, 200)
                setTimeout( function() {clearResponses()}, 410)
            }
        }
        else {
            if (winTester(userResponse)) {
                setTimeout( function () {alert("Correct! Press 'Ready' again to try the next level.")}, 410)
                setTimeout( function () {clearResponses()}, 410)
                turn++
                updateLevel()
                addRandom()
            } else {
                setTimeout( function() {alert("Not quite. Guess again, or press 'Ready' to start over.")}, 200)
                setTimeout( function() {clearResponses()}, 410)
            }
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


//functions to move the game forward or reset the game -----------------------------------------------
const clearResponses = function () {
    userResponse = []
}

const reset = function () {
    clearResponses()
    turn = 1
    updateLevel()
    sequence = []
    speed = 800
}

let resetButton = document.querySelector('.reset-container button')
resetButton.addEventListener('click', reset)

const updateLevel = function () {
    let levelDisplay = document.querySelector('span')
    levelDisplay.innerHTML = turn
}

//make button to speed up 
const speedUp = function () {
    speed = speed * .5
    console.log(speed)
}

let speedButton = document.querySelector('.speed-container button')
speedButton.addEventListener('click', speedUp)
