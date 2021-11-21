### wp1101 hw6
# Number Guessing Game
####  2021/11/22

## Requirements
### Basics
1. generate a number after clicking `start game`
2. pass the number in input box to backend
3. show proper message after getting error from backend
4. set winning mode after the number is guessed
5. enter guess mode after clicking restart
6. declare global variable `number` in backend
7. implement `genNumber()` and `getNumber` in `backend/core/getNumber.js`
8. return guessing suggestion after calling `/guess` API
9. if the input number is invalid for API `/guess` raise HTTP error 406

### Advanced
1. show proper message in frontend if backend isn't connected
2. design a game that client and server can have interaction, e.g., 1A1B or Tic-Tac-Toe
3. any improvement in UI/UX
   
## What I've done
1. all the basic requirements
2. all the Advanced requirement
3. the game I designed is that the server guesses client's number. client should keep a number in mind and tell the server guess smaller or bigger.
4. uncomment or comment row 155 or 157 in `App.js` to test different game mode
5. change button's style  

## Improvements
1. could have more improvements in UI


## How to run the app
`yarn install`  
`yarn start`
`yarn server`

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.