//set up variables
let colors = [
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
let mode = 'Standard'
let squares = document.querySelectorAll('.squares-container .game-square')
let instructions = document.querySelector('h4')
let middleRow = document.querySelector('.middle')

//function to create random array of colors -----------------------------------------------------------

const randomizer = function () {
    for (let i = 0; i < (turn + 2); i++) {
        let random = Math.random()
        let length = colors.length
        let index = Math.floor(length * random)
        sequence.push(colors[index])
    }
}

// function to add a random color to the sequence ------------------------------------------------

const addRandom = function () {
    let random = Math.random()
    let length = colors.length
    let index = Math.floor(length * random)
    sequence.push(colors[index])
}

// toggle highlighted square in order of the sequence ------------------------------------------
const highlighter = function(color) {
    let currentSquare = squares[0]
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].id === color) {
            currentSquare = squares[i]
        }
    }
    currentSquare.classList.toggle('highlighted')

}

const gameLoop = function () {
    setTimeout( function () {
        let currentColor = sequence[i]
        highlighter(currentColor)
        setTimeout( function () {
            highlighter(currentColor)
        }, speed)
        setTimeout( function () {
            if (mode === 'Standard') {
                instructions.innerHTML = 'Now click the sequence of colors in the same order'
            } else {
                instructions.innerHTML = 'Now click the sequence of colors in the REVERSE order'
            }
        }, speed + (speed * sequence.length) + 100)
        i++
        if (i < sequence.length) {
            gameLoop()
        }
   }, (speed + 250))
}

const playGame = () => {
    userResponse = []
    instructions.innerHTML = 'Watch the sequence of colors...'
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

const clickHandler = function (evt) {
    let guess = evt.target.id
    userResponse.push(guess)

    highlighter(guess)
    setTimeout(() => {highlighter(guess)}, 150)

    if (userResponse.length >= sequence.length && mode === 'Standard') {
        if (winTester(userResponse)) {
            winHandler()
        } else {
            lossHandler()
        }
    }
    if (userResponse.length >= sequence.length && mode === 'Reverse') {
        if (reverseTester(userResponse)) {
            winHandler()
        } else {
            lossHandler()
        }
    }
}

for (let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', clickHandler)
}

//functions for handling a correct response or an incorrect response -------------------------------------------

const winHandler = function () {
    setTimeout( () => {instructions.innerHTML = "Correct! Press 'Ready' again to try the next level."}, 410)
    clearResponses()
    turn++
    updateLevel()
    addRandom()
}

const lossHandler = function () {
    if (turn != 1) {
        setTimeout( () => {instructions.innerHTML = "Not quite! Guess again, press 'Ready' to replay, or press 'Reset Game' to start over."}, 410)
        clearResponses()
    } else {
        setTimeout( () => {instructions.innerHTML = "Not quite! Guess again, or press 'Ready' to start over."}, 410)
        clearResponses()
    }
}

//now compare user's response to the sequence ----------------------------------------------------------
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
const clearResponses = () => {
    userResponse = []
}

const reset = function () {
    clearResponses()
    turn = 1
    updateLevel()
    sequence = []
    speed = 800
    mode = 'Standard'
    updateMode()
    instructions.innerHTML = "Press 'Ready' to begin"
    if (colors.length > 4) {
        colors.pop()
        let purple = document.getElementById('purple')
        purple.parentNode.removeChild(purple)

    }
}

let resetButton = document.querySelector('.reset-container button')
resetButton.addEventListener('click', reset)

const updateLevel = function () {
    let levelDisplay = document.querySelector('.level')
    levelDisplay.innerHTML = turn
}

//make button to speed up the game ---------------------------------------------------------------------------

const speedUp = function () {
    speed = speed * .5
    console.log(speed)
}

let speedButton = document.querySelector('.speed-container button')
speedButton.addEventListener('click', speedUp)

//make button for reverse mode --------------------------------------------------------------------------------

const reverseTester = function (userResponse) {
    let count = 0
    for (let i = 0; i < sequence.length; i++) {
        if (userResponse[i] === sequence[(sequence.length - (i + 1))]) {
            count++
        }
    }
    return count === sequence.length
}

const reverseMode = () => {
    mode = 'Reverse'
    updateMode()
    console.log('Reverse mode')
    instructions.innerHTML = 'You are now in Reverse Mode'
}

let reverseButton = document.querySelector('.reverse-container button')
reverseButton.addEventListener('click', reverseMode)

const updateMode = () => {
    let modeDisplay = document.querySelector('.mode')
    modeDisplay.innerHTML = ` ${mode}`
}


//function to add color --------------------------------------------------------------------------------------

const addColor = function () {
    if (colors.length === 4) {
        colors.push('purple')
        let div = document.createElement("DIV")
        div.classList.add('game-square')
        div.id = 'purple'
        middleRow.appendChild(div)
        squares = document.querySelectorAll('.squares-container .game-square')
        squares[3].addEventListener('click', clickHandler)
    } else {
        alert('Too many colors!')
    }
}

let addButton = document.querySelector('.add-container button')
addButton.addEventListener('click', addColor)
