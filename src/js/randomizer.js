module.exports = {
    randomizer: function(colors, level) {
        let sequence = []
        for (let i = 0; i < (level + 2); i++) {
            let random = Math.random()
            let length = colors.length
            let index = Math.floor(length * random)
            sequence.push(colors[index])
        }
        return sequence
    }
}