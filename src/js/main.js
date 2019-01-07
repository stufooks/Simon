const colors = [
    'red',
    'blue',
    'green',
    'yellow',
    'purple',
    'pink',
    'magenta',
    'coral',
    'cyan',
    'linen',
    'violet',
    'tomato'
]

const simonSquare = document.querySelector('.simon .game-square')

const colorChanger = require('./colorChanger.js')

colorChanger.colorChanger(colors, simonSquare)