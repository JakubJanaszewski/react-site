import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import './Chat.css';

function Chat() {
  const [socket, ] = useState(io(`ws://localhost:8000`));
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState(''); 

  //setSocket(`ws://localhost:8000`);

  /*useEffect(() => {
    const newSocket = io(`ws://localhost:8000`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);*/

  useEffect(() => {   
    function messageListener(message){
      console.log(message)
      setMessages((prevMessages) => {
        return prevMessages.concat(message);
      });
    }

    socket.on('message', messageListener);
    socket.emit('getMessages');

    return () => {
      socket.off('message', messageListener);
    };
  }, [socket]);

  function submitForm(e){
    e.preventDefault();
    socket.emit('message', value);
    setValue('');
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
              <li key={key}>{messages[key]}</li>
            ))}
          </div>
          <form onSubmit={submitForm}>
            <input
              autoFocus
              value={value}
              placeholder="Type your message"
              onChange={(e) => {
                setValue(e.currentTarget.value);
              }}
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