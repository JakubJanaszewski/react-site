import React, { useEffect, useState } from 'react';
import './Messages.css';

function Messages({ socket }) {
  const [messages, setMessages] = useState([]);

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

  return (
    <div className="message-list">
      {Object.keys(messages).map((key) => (
        <li key={key}>{messages[key]}</li>
      ))}
    </div>
  );
}

export default Messages;