module.exports = {
    colorChanger: function() {
        let colors = [
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
        let length = colors.length
        let index = Math.floor(Math.random() * length)
        let square = document.querySelector('.simon .game-square')
    
        square.style.backgroundColor = colors[index]
    }
}