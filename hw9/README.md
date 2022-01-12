### wp1101 hw8
# ChatRoom
### A-Full-Stack Applicatio  
####  2021/12/9

## Requirements
### Basics
1. Enter name in the sign in page. After signing in, change the page to chatroom page. The title should be the name you entered. If no name was entered, error message should pop up and shouldn't complete sign in.
2. Show sign in page when refreshing or opeing a new tab, and the input box should show the name last signed in bt local storage.
3. Store every messages in MongoDB. Show every message when one's signed in.
4. Open multiple browser and test group chat function. A message should be broadcast after sending.
5. The message record should be cleared in both chatroom and database when `clear` is clicked. Everyone's chatroom should also be cleared.
6. Use `displayStatus` function to show proper messages above the chatroom.
   
### Advanced
1. Add register and check password function in sign in page.
2. Make group chat to one-to-one chatroom.
3. See more requirements in [hw8 description](https://ceiba.ntu.edu.tw/course/fdb723/hw/hw8.pdf)
   
## What I've done
1. Basic requirements

## Improvements
1. none for now

## How to run the app
1. copy `.env.defaults`, rename it to `.env` and fill in the variables
2. `yarn install`  
3. `cd frontend`   
   `yarn install`   
   `yarn start`
4. open a differnet terminal    
    `cd backend`  
    `yarn install`  
    `cd ..`  (go back to `hw8`)  
    `yarn server`

Open [http://localhost:3000](http://localhost:3000) to view the app in the browser.