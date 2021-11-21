import axios from 'axios'
const instance = axios.create({ baseURL: 'http://localhost:4000/api/guess'})

const startGame = async () => {
    const { data: { msg }} = await instance.post('/start')
    return msg
}

const guess = async ( number ) => {
    try {
        const { data: {msg} } = await instance.get('/guess', { params: { number }})
        return msg
    }
    catch (error) {
        console.log(error.message)
        return error.message
    }
}

const restart = async () => {
    const { data: { msg }} = await instance.post('/restart')
    return msg
}

const startGame2 = async () => {
    const { data: { msg }} = await instance.post('/start2')
    return msg
}

const smaller = async ( number2 ) => {
    try {
        const { data: { num }} = await instance.get('/guess2/smaller', { params: { number2 }})
        return num
    }
    catch (error) {
        console.log(error.message)
        return error.message
    }
}

const equal = async () => {
    const { data: { num }} = await instance.post('/guess2/equal')
    return num
}

const bigger = async ( number2 ) => {
    try {
        const { data: { num }} = await instance.get('/guess2/bigger', { params: { number2 }})
        return num
    }
    catch (error) {
        console.log(error.message)
        return error.message
    }
}
export {startGame, guess, restart, startGame2, smaller, equal, bigger}
