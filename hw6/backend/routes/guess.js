import express from 'express'
const getNum = require('../core/getNumber');
const router = express.Router()

router.post('/start', (_, res) => {
    getNum.genNumber()
    res.json( {msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
    const number = getNum.getNumber()
    const guessed = roughScale(req.query.number, 10)

    // check if NOT a num or not in range [1, 100]
    if( number === 0 ) {
        getNum.genNumber()
        res.json( { msg: 'Please keep guessing.' })
    }
    else if (!guessed || guessed < 1 || guessed > 100) {
        res.status(406).send({ msg: `Invalid Number` })
    }
    else if (number === guessed) {
        res.json( { msg: 'Equal' })
    } 
    else if (number > guessed) {
        res.json( { msg: `${ guessed }  is too small` })
    }
    else { // (number < guessed) 
        res.json( { msg: `${ guessed }  is too big` })
    }
})

router.post('/restart', (_, res) => {
    getNum.setLeft(0)
    getNum.setRight(1000)
    getNum.genNumber()
    res.json( { msg: 'Restart' })
})


router.post('/start2', (_, res) => {
    res.json( {msg: 'The game has started.' })
})

router.get('/guess2/smaller', (req, res) => {
    let input = roughScale(req.query.number2, 10)

    getNum.setRight(input)
    let newGuess = getNum.guessNumber()
    res.json( {num: `${ newGuess }` })
})

router.post('/guess2/equal', (_, res) => {
    let currentNum = getNum.guessNumber()
    res.json( {num: `${ currentNum }` })
})

router.get('/guess2/bigger', (req, res) => {
    let input = roughScale(req.query.number2, 10)
    getNum.setLeft(input)
    let newGuess = getNum.guessNumber()
    res.json( {num: `${ newGuess }`  })
})

const roughScale = (x, base) => {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }

    return parsed;
}

export default router