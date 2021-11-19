var answer = 0

function genNumber() {
    answer = Math.floor(Math.random() * 100)
    console.log(answer)
    // return 1
}

function getNumber() {
    return answer
}

module.exports = { genNumber, getNumber }