import { useState, useEffect, useRef } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:4000";


export const Chat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const socketRef = useRef();



  // useEffect(() => {
  //   socketRef.current = socketIOClient(ENDPOINT);

  //   socketRef.current.on('message', (message) => {
  //     setMessages(prevMessages => [...prevMessages, message]);
  //   });

  //   return () => {
  //     socketRef.current.disconnect();
  //   }
  // }, [])

  const handleMessage = (e) => {
    console.log(e.target.value);
    setMessage(e.target.value);
  };


  const sendMessage = () => {
    if (message) {
      socketRef.current.emit('message', message);
      setMessage("");
    }
  };

  return <>
    <h1>Chat App</h1>
    <div>
      {messages.map((msg, index) => (
        <div key={index}> {msg}</div>
      ))}
    </div>

    <input
      type="text"
      value={message}
      onChange={handleMessage}
    />
    <button onClick={sendMessage}>Send</button>

  </>
}