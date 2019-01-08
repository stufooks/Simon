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
const highlight = function(color) {
    let currentSquare
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].style.backgroundColor === color) {
            currentSquare = squares[i]
        }
    }
    currentSquare.classList.add('highlighted')
}

const removeHighlight = function(color) {
    let currentSquare
    for (let i = 0; i < squares.length; i++) {
        if (squares[i].style.backgroundColor === color) {
            currentSquare = squares[i]
        }
    }
    currentSquare.classList.remove('highlighted')
}

let i = 0
const loop = function () {
   setTimeout( function () {
        let currentColor = sequence[i]
        highlight(currentColor)
        setTimeout( function () {
            removeHighlight(currentColor)
        }, 500)
        i++
        if (i < sequence.length) {
            loop()
        }
   }, 2000)
}

loop()