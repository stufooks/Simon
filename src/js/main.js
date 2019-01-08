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