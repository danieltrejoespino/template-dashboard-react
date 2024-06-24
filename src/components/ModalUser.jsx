import { useState, useContext } from "react";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';

import { UserContext } from "../context/UserContext";

import IconButton from "@mui/material/IconButton";
import SaveIcon from '@mui/icons-material/Save';
const style = {
  position: 'absolute',
  top: '30%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalUser({ open, handleClose }) {
  const { user } = useContext(UserContext);

  const [formValues, setFormValues] = useState({
    name: user.name,
    pass: '',
    nickname: user.apodo,
  });

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Hola {user.apodo} aqui puedes modificar tu usuario
          </Typography>

          <TextField
            fullWidth
            value={formValues.name}
            name="name"
            label="Nombre"
            variant="standard"

          />
          <TextField
            fullWidth
            value={formValues.nickname}
            name="nickname"
            label="Apodo"
            variant="standard"

          />
          <TextField
            fullWidth
            value={formValues.pass}
            name="pass"
            label="Nueva contrase&ntilde;a"
            variant="standard"

          />
          <IconButton
            type="submit"
            color="success"
            aria-label="add"
          >
            Guardar
            <SaveIcon sx={{ fontSize: 20 }} />
          </IconButton>




        </Box>

      </Modal>
    </div>
  );
}

