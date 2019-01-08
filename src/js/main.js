//style game board
const squares = document.querySelectorAll('.squares-container .game-square')
const colors = [
    'green',
    'red',
    'yellow',
    'blue'
]

for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i]
}

//create random array of colors
let level = 1
let sequence = []
for (let i = 0; i < (level + 2); i++) {
    let random = Math.random()
    let length = colors.length
    let index = Math.floor(length * random)
    sequence.push(colors[index])
}
console.log(sequence)

// change borders of game squares in order of sequence
const squareSelector = function(currentColor) {
    let currentSquare
    for (let j = 0; j < squares.length; j++) {
        if (squares[j].style.backgroundColor === currentColor) {
            currentSquare = squares[j]
            console.log(currentSquare)
        }
    }
    return currentSquare
}

const highlight = function(currentSquare) {
    console.log(currentSquare)
    currentSquare.classList.add('highlighted')
}

const removeHighlight = function(currentSquare) {
    currentSquare.classList.remove('highlighted')
}

for (let i = 0; i < sequence.length; i++) {

    let currentColor = sequence[i]

    let currentSquare = squareSelector(currentColor)

    highlight(currentSquare)

    removeHighlight(currentSquare)
}
