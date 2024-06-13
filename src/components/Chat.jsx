import { useState, useEffect, useRef, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import { UserContext } from './UserContext';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

const ENDPOINT = "http://localhost:4000";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));




export const Chat = () => {
  const { user } = useContext(UserContext);


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

    <Box sx={{ flexGrow: 1 }} >
      <Grid container spacing={2} >
        {/* <Grid xs={12}>
          <Item>
            <Typography variant="h5" gutterBottom>
              Chat
            </Typography>
          </Item>
        </Grid> */}
        <Grid xs={2}>
          <Item>
            <Typography variant="h5" gutterBottom>
              Chats
            </Typography>
          </Item>
        </Grid>
        <Grid xs={10}>
          <Item>xs=9</Item>
        </Grid>
      </Grid>
    </Box>

    {/* <p>Name: {user.name}</p>
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
    <button onClick={sendMessage}>Send</button> */}

  </>
}