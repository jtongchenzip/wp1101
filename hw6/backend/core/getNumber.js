var answer = 0
var left = 0
var right = 1000

function genNumber() {
    answer = Math.floor(Math.random() * 100)
}

function getNumber() {
    return answer
}

function setLeft(input) {
    left = input
}

function setRight(input) {
    right = input
}

function guessNumber() {
    if(left === 0 && right === 0) {
        setRight(1000)
    }
    else if(left === 999 && right === 1000) {
        setLeft(1000)
    }
    // console.log(left, right)
    return Math.floor((left + right) / 2)
}

module.exports = { genNumber, getNumber, guessNumber, setLeft, setRight }