import { useState, useEffect, useRef, useContext } from 'react';
import socketIOClient from 'socket.io-client';
import { UserContext } from './UserContext';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import SvgIcon from '@mui/material/SvgIcon';
import TextField from '@mui/material/TextField';



const ENDPOINT = "https://172.20.2.57:4000";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function HomeIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
    </SvgIcon>
  );
}




export const Chat = () => {
  const { user } = useContext(UserContext);


  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])
  const socketRef = useRef();



  useEffect(() => {
    socketRef.current = socketIOClient(ENDPOINT);

    socketRef.current.on('message', (message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socketRef.current.disconnect();
    }
  }, [])

  const handleMessage = (e) => {
    setMessage(e.target.value);
    console.log(messages);
  };


  const sendMessage = (e) => {
    e.preventDefault()
    if (message) {
      let data = {
        userid: user.idUser,
        userName: user.nameUser,
        msg: message
      }
      socketRef.current.emit('message', data);
      setMessage("");
    }
  };

  return <>
    <Box component="section" sx={{ p: 2, border: '1px dashed grey', width: '100%' }}>
      <Grid container spacing={2}>
        <Grid xs={3}>
          <Item>xs=8</Item>
        </Grid>
        <Grid xs={9}>
          <Item>
            xs=9
            {messages.map((msg, index) => (
              <div key={index}>
                <p>{msg.userName} : {msg.msg}</p>
              </div>
            ))}
          </Item>
        </Grid>
      </Grid>
    </Box>


    <Box component="section" sx={{ p: 2, border: '1px dashed grey', width: '100%' }}>
      <Grid container spacing={2}>
        <Grid xs={3}>
          <Item>xs=8</Item>
        </Grid>
        <Grid xs={9}>
        <form onSubmit={sendMessage}>        
          <Item>
            <TextField
              label="Mensaje"
              variant="outlined"
              value={message}
              onChange={handleMessage}
            />
            <Button type="submit" color="secondary">              
              <HomeIcon color="secondary" sx={{ fontSize: 20 }} />
            </Button>
          </Item>
          </form>
        </Grid>
      </Grid>
    </Box>


  </>
}