//set up constants
const squares = document.querySelectorAll('.squares-container .game-square')
const colors = [
    'green',
    'red',
    'yellow',
    'blue'
]
let level = 1
let sequence = []

//create random array of colors
for (let i = 0; i < (level + 2); i++) {
    let random = Math.random()
    let length = colors.length
    let index = Math.floor(length * random)
    sequence.push(colors[index])
}
console.log(sequence)

// change borders of game squares in order of sequence
const highlight = function(color) {
    let currentSquare
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].id === color) {
            currentSquare = squares[i]
        }
    }
    currentSquare.classList.add('highlighted')
}

const removeHighlight = function(color) {
    let currentSquare
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].id === color) {
            currentSquare = squares[i]
        }
    }
    currentSquare.classList.remove('highlighted')
}

let i = 0
const gameLoop = function () {
   setTimeout( function () {
        let currentColor = sequence[i]
        highlight(currentColor)
        setTimeout( function () {
            removeHighlight(currentColor)
        }, 1000)
        i++
        if (i < sequence.length) {
            gameLoop()
        }
   }, 1500)
}

gameLoop()

//now get the user's response
// const clickHandler = function (evt) {
//     evt.target
// }

// for (let i = 0; i < squares.length; i++) {
//     squares[i].addEventListener('click', clickHandler)
// }