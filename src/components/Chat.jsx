import { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const ENDPOINT = "http://localhost:4000";


export const Chat = () => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const socket = socketIOClient(ENDPOINT)

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    })
    return () => socket.disconnect();
  }, [socket])

  const handleMessage = () => {
    if (message) {
      socket.emit('message', message)
      setMessage('')
    }

  }

  return <>
    <h1>Chat App</h1>
    <div>
      { messages.map((msg,index) =>(
        <div key={index}> {msg}</div>
      )) }
    </div>

    <input
      type='text'
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleMessage()}
    />

  </>
}