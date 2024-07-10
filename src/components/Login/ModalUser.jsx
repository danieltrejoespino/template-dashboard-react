import { useState, useContext } from "react";
import axios from "axios";

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Grid from "@mui/material/Unstable_Grid2";
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import { toast } from "react-toastify";

import { UserContext } from "../../context/UserContext";

import IconButton from "@mui/material/IconButton";
import SaveIcon from '@mui/icons-material/Save';
const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  borderRadius: '20px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ModalUser({ open, handleClose }) {
  const { user, setUserInfo } = useContext(UserContext);

  const [formValues, setFormValues] = useState({
    name: user.name,
    pass: '',
    nickname: user.apodo,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }))

  }
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleSubmit = async  () => {
    const url = "https://localhost:4001/apiCiti/updateUser";
    const params = {
      ID_USER: user.id,
      NAME_USER: formValues.name,
      APODO: formValues.nickname,
      PAS_USER: formValues.pass
    }

    try {
      const response = await axios.put(url, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      if (response.status == 200) {
        setUserInfo(formValues.name, user.id, user.profile, formValues.nickname);
        toast.success("Datos actualizados con exito!");

        setShowSuccessAlert(true); 
        setTimeout(() => {
          handleClose(); 
          setShowSuccessAlert(false); 
          setFormValues({
            name: user.name,
            pass: '',
            nickname: user.apodo
          })
        }, 3000);
        
      } else {
        toast.error("Error al actualizar los datos.");
      }
    } catch (error) {
      // console.log(error);
      if (error.response.status == 404) {
        toast.error(
          "Error al actualizar los datos."
        );
      } else {
        toast.error("Error al actualizar los datos!"); // Mensaje genérico para otros errores
      }
    }



  }

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} component="section">
          <Grid container spacing={2}>
            <Grid xs={12}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Hola {user.apodo} aqui puedes modificar tu usuario
              </Typography>
            </Grid>

            <Grid xs={4}>
              <TextField
                fullWidth
                value={formValues.name}
                onChange={handleInputChange}
                name="name"
                label="Nombre"
                variant="standard"

              />
            </Grid>
            <Grid xs={4}>
              <TextField
                fullWidth
                value={formValues.nickname}
                onChange={handleInputChange}
                name="nickname"
                label="Apodo"
                variant="standard"

              />
            </Grid>
            <Grid xs={4}>
              <TextField
                fullWidth
                value={formValues.pass}
                onChange={handleInputChange}
                name="pass"
                label="Nueva contrase&ntilde;a"
                variant="standard"

              />
            </Grid>
            <Grid xs={12}>
              <IconButton
                type="submit"
                color="success"
                aria-label="add"
                onClick={handleSubmit}
              >
                Actualizar
                <SaveIcon sx={{ fontSize: 20 }} />
              </IconButton>

            </Grid>
              <Grid xs={12}>
            {showSuccessAlert && (
                <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
                  Datos actualizados con exito!.
                </Alert>
            )}
              </Grid>

          </Grid>










        </Box>

      </Modal>
    </div>
  );
}

