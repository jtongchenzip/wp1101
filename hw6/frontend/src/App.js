import React, { useState } from 'react';
import './App.css';
import { startGame, guess, restart } from './axios';

function App() {
  const [hasStarted, setHasStarted] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [number, setNumber] = useState('');
  const [status, setStatus] = useState(' ');

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
      setHasStarted(true)
    }
  }

  const handleRestart = async () => {
    const response = await restart()

    if (response === 'Restart') {
      setHasStarted(false)
      setHasWon(false)
      setNumber('')
      setStatus(' ')
    }
  }

  const startMenu = 
    <div>
      <button onClick={ handleStart }> start game </button>
    </div>
  
  const gameMode = 
    <>
      <p>Guess a number between 1 to 100</p>
      <input value={ number }
             onChange={ (event) => setNumber(event.target.value)}>        
      </input>
      <button onClick={ handleGuess } disabled={!number}>guess!</button>
      <p>{status}</p>
    </>

  const winningMode = (
    <>
      <p>you won! the number was {number}.</p>
      <button onClick={ handleRestart }>restart</button>
    </>
  )

  const game = 
    <div>
      {hasWon ? winningMode : gameMode}
    </div>

  return (
    <div className="App">
      { hasStarted ? game : startMenu }
    </div>
  )
}

export default App;
