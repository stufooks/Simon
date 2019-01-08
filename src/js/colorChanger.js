module.exports = {
    colorChanger: function() {
        let colors = [
            'red',
            'blue',
            'green',
            'yellow',
        ]
        let length = colors.length
        let index = Math.floor(Math.random() * length)
        let square = document.querySelector('.simon .game-square')
    
        square.style.backgroundColor = colors[index]
    }
}