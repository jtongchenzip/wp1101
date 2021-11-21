import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import { startGame, guess, restart, startGame2, smaller, equal, bigger } from './axios';

function App() {
  const [hasStarted1, setHasStarted1] = useState(false);
  const [hasStarted2, setHasStarted2] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState(' ');
  const [number2, setNumber2] = useState('500');

  const handleGuess = async () => {
    const response = await guess(number)

    if(response === 'Equal') {
      setHasWon(true)
    }
    else if(response === 'Not Equal') {
      console.log(response)
      setStatus('Keep Guessing')
    }
    else if (response === 'Request failed with status code 406') {
      setStatus(`Error: ${ number } is not a valid number (1 - 100)`)
    }
    else if (response === 'Network Error') {
      setStatus(`Please Wait...backend is missing (HTTP 50x)`)
      // handleRestart()
    }
    else {
      setStatus(response)
      setNumber('')
    }
  }

  const handleStart = async () => {
    const response = await startGame()

    if (response === 'The game has started.') {
      setHasStarted1(true)
    }
  }

  const handleStartGame2 = async () => {
    const response = await startGame2()

    if (response === 'The game has started.') {
      setHasStarted2(true)
    }
  }

  const handleSmaller = async () => {
    console.log(number2)
    const responseNum = await smaller( number2 )

    if (responseNum === 'Network Error') {
      setNumber2(`Please Wait for backend....`)
    }
    else {
      setNumber2(responseNum)
    }
    
  }

  const handleEqual = async () => {
    const responseNum = await equal()
    setNumber2(responseNum)
    setHasWon(true)
  }

  const handleBigger = async () => {
    const responseNum = await bigger( number2 )
    if (responseNum === 'Network Error') {
      setNumber2(`Please Wait for backend....`)
    }
    else {
      setNumber2(responseNum)
    }
  }

  const handleRestart = async () => {
    const response = await restart()
    if (response === 'Restart') {
      setHasWon(false)
      setNumber('')
      setStatus(' ')
      setNumber2('500')
    }
  }

  const startMenu = 
    <div>
      <div> </div> 
      <div> </div> 
      <div> </div> 
      <Button onClick={ handleStart } variant="contained"> You guess computer's number </Button>
    </div>

  const startMenu2 = 
    <div>
      <Button onClick={ handleStartGame2 } variant="contained"> Computer guess your number </Button>
    </div>
  
  const gameMode = 
    <>
      <p>Guess a number between 1 to 100</p>
      <input value={ number }
             onChange={ (event) => setNumber(event.target.value)}>        
      </input>
      <Button onClick={ handleGuess } disabled={!number} variant="contained">guess!</Button>
      <p>{status}</p>
    </>

  const gameMode2 = 
  <>
    <p>Keep a number between 1~1000 in mind.</p>
    <p>Tell the computer to guess smaller or bigger.</p>
    <p>If the number below equals your number, click the 'EQUAL!' button.</p>
    <h2>{ number2 }</h2>
    <Button onClick={ handleSmaller } variant="contained">smaller</Button>
    <Button onClick={ handleEqual } variant="contained">equal!</Button>
    <Button onClick={ handleBigger } variant="contained">bigger</Button>
    <p>{status}</p>
  </>

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <Button onClick={ handleRestart } variant="contained">restart</Button>
    </>
  )

  const winningMode2 = (
    <>
      <p>The computer said the number is {number2}!</p>
      <Button onClick={ handleRestart } variant="contained">restart</Button>
    </>
  )

  const game = 
    <div>
      {hasWon ? winningMode : gameMode}
    </div>

  const game2 = 
    <div>
      {hasWon ? winningMode2 : gameMode2}
    </div>

  return (
    <div className="App">

      {/* to test basic requirement, uncomment this */}
      {/* { hasStarted1 ? game : startMenu } */}
      {/* to test advanced requirement, uncomment this */}
      { hasStarted2 ? game2 : startMenu2 }
    </div>
  )
}

export default App;
