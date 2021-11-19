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
    // console.log(guessed)

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
    res.json( { msg: 'Restart' })
})

const roughScale = (x, base) => {
    const parsed = parseInt(x, base);
    if (isNaN(parsed)) { return 0; }

    return parsed;
}

export default router