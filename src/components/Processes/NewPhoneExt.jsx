import { useState } from 'react';

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height: '400px',
  borderRadius: '20px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto'
};



export const NewPhoneExt = ({ open, handleClose, data }) => {

  const [formData, setFormData] = useState({
    NOMBRE_MOSTRAR: '',
    EXTENSION: '',
    ASIGNADO: '',
    WORK_EXT: ''
  });

  const [inputs, setInputs] = useState(data)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    console.log(inputs);
  }



  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="section" sx={style}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={6}>
                <Typography variant="h6" component="h6">
                  Agrega una nueva extensión
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="success"
                  type="submit"
                >
                  Guardar extensión
                </Button>
              </Grid>
                {inputs.map((campo) => (
                  <Grid item xs={4} key={campo.key}>
                    <TextField
                      name={campo.key}
                      label={campo.label}
                      variant="standard"
                      value={formData[campo.key]}
                      onChange={handleChange}
                      required
                    />

                  </Grid>
                ))}
            </Grid>
          </form>
        </Box>
      </Modal>
    </div>
  )
}
