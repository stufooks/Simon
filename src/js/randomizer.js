module.exports = {
    randomizer: function(colors, turn) {
        for (let i = 0; i < (turn + 2); i++) {
            let sequence = []
            let random = Math.random()
            let length = colors.length
            let index = Math.floor(length * random)
            sequence.push(colors[index])
            return sequence
        }
    }
}