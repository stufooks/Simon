//style game board
const squares = document.querySelectorAll('.game-square')
const colors = [
    'green',
    'red',
    'yellow',
    'blue'
]

for (let i = 0; i < squares.length; i++) {
    squares[i].style.backgroundColor = colors[i]
}