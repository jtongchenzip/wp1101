import { useEffect, useState, useRef } from 'react'
// import './App.css'
import styled from "styled-components";
import { Button, Input, Tag, message } from 'antd'
import useChat from '../Hooks/useChat';
import ChatRoom from './ChatRoom';
import SignIn from './SignIn';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const LOCALSTORAGE_KEY = 'jtc';

function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const { status, messages, sendMessage, clearMessages } = useChat()
  const [ username, setUsername ] = useState('')
  const [ body, setBody ] = useState('')
  const [ me, setMe ] = useState(savedMe || '');
  const [ signedIn, setSignedIn ] = useState(false);
  const bodyRef = useRef(null);

  const displayStatus = (payload) => {
    if(payload.msg) {
      const { type, msg } = payload
      const content = {
        content: msg, duration: 0.75
      }
      switch (type) {
        case 'success': {
          message.success(content)
          break
        }
        case 'error': {
          message.error(content)
          break
        }
      }
    }
  }

  useEffect(() => { displayStatus(status) }, [status])
  useEffect(() => {
    if (signedIn) { localStorage.setItem(LOCALSTORAGE_KEY, me)} 
  }, [ signedIn, me ])

  return (
    <div className="App">
      <Wrapper>
        { signedIn ?
          <>
            <ChatRoom me={me} messages={messages} clearMessages={clearMessages}></ChatRoom>
            <Input
              placeholder="Username"
              value={ username }
              onChange={ (e) => setUsername(e.target.value) }
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  bodyRef.current.focus()
              }}}
              style={ { marginBottom: 10 } }
            ></Input>
            <Input.Search
              value={ body }
              onChange={ (e) => setBody(e.target.value)}
              enterButton="Send"
              placeholder="Type a message here..."
              ref={ bodyRef }
              onSearch={ (msg) => {
                if (!msg || !username) {
                  displayStatus({
                    type: 'error',
                    msg: 'Please enter a username and a message body.'
                  })
                  return
                }
                sendMessage( {name: username, body: msg} )
                setBody('')
              }}
            ></Input.Search>
          </> : <SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus}/> }
      </Wrapper>
    </div>
  )
}

export default App
