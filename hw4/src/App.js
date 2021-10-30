import React from 'react';
import './App.css';
import Main from './containers/main.js'
import Header from './containers/header.js'
import Footer from './containers/footer.js'

global.itemCount = 0;
global.completeCnt = 0;
global.totalCnt = 0;

function App() {
  return (
    <div id="appRoot" className="todo-app__root">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default App;
