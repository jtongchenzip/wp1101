import { useEffect, useState, useRef } from 'react';
import styled from "styled-components";
import { Button, Input, Tag, message } from 'antd';

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
  const [ me, setMe ] = useState(savedMe || '');
  const [ signedIn, setSignedIn ] = useState(false);

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

  useEffect(() => {
    if (signedIn) { localStorage.setItem(LOCALSTORAGE_KEY, me)} 
  }, [ signedIn, me ])

  return (
    <div className="App">
      <Wrapper>
        { signedIn ? (
            <ChatRoom me={me} displayStatus={displayStatus} />
            ) : (
            <SignIn me={me} setMe={setMe} setSignedIn={setSignedIn} displayStatus={displayStatus} /> 
            )
        }
      </Wrapper>
    </div>
  )
}

export default App;
