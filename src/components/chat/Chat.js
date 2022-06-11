import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';

import ShadowElement from '../ui/ShadowElement'
import classes from './Chat.module.css';

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
    <ShadowElement>
      <div className={classes.chat}>
        <header>
          Chat with bot
        </header>
        { socket ? (
          <div className={classes.container}>
            <div className={classes.list}>
              {Object.keys(messages).map((key) => (
                <p className={classes.message} id={messages[key].who} key={key}>{messages[key].message}</p>
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
    </ShadowElement>
  );
}

export default Chat;