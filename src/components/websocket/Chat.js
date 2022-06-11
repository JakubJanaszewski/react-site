import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

import './Chat.css';

function Chat() {
  const [socket, ] = useState(io(`ws://localhost:8000`));
  const [messages, setMessages] = useState([]);
  const inputRef = useRef();

  useEffect(() => {   
    socket.on('message', messageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
    };
  }, [socket]);

  function messageListener(message){
    console.log(message)
    updateMessages('bot', message);
  }

  function updateMessages(who, message){
    setMessages((prevMessages) => {
      return prevMessages.concat({who: who, message: message});
    });
  }


  function submitForm(e){
    e.preventDefault();
    if(inputRef.current.value){
      updateMessages('user', inputRef.current.value);
      socket.emit('message', inputRef.current.value);
      inputRef.current.value = '';
    }
  };

  return (
    <div className="App">
      <header className="app-header">
        React Chat
      </header>
      { socket ? (
        <div className="chat-container">
          <div className="message-list">
            {Object.keys(messages).map((key) => (
              <li key={key}>{messages[key].who + ": " + messages[key].message}</li>
            ))}
          </div>
          <form onSubmit={submitForm}>
            <input
              autoFocus
              ref={inputRef}
              placeholder="Type your message"
            />
          </form>
        </div>
      ) : (
        <div>Not Connected</div>
      )}
    </div>
  );
}

export default Chat;