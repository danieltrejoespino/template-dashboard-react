import { useState, useEffect } from "react";
import axios from "axios";

import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Alert from '@mui/material/Alert';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const style = {
  width: '100%',
  // height: '400px',
  borderRadius: '20px',
  bgcolor: 'background.paper',
  border: '1px ',
  boxShadow: 1,
  p: 2,
  m: 1
  // overflow: 'auto'
};


export default function GetRegister() {
  const [openBackdrop, setOpenBackdrop] = useState(true); //Loading
  const [showAlert, setShowAlert] = useState(false); //Validate form
  const [missingData, setMissingData] = useState(''); //validate form

  const [customerData, setCustomerData] = useState([]); //Customer information
  const [product, setProduct] = useState(''); // Product to sell
  const [formContact, setFormContact] = useState(true); // show ir hide contact form


  useEffect(() => {
    const getRegister = async () => {
      const url = "https://localhost:4000/getRegister";
      try {
        const rsp = await axios.post(url, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        // console.log(rsp.data[0]);
        setCustomerData(rsp.data[0].Customer)

        setOpenBackdrop(false)
      } catch (error) {
        console.log(error);
        setOpenBackdrop(false)
      }
    }
    getRegister()
  }, [])

  const handleProduct = (event) => {
    console.log(event.target.value);
    setProduct(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setMissingData('Llena los campos faltantes')
    setShowAlert(true)

    setFormContact(false)

  }


  const handleReturnContact = () => {
    setFormContact(true)
  }

  return (
    <>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h6" component="h6" sx={{ mb: 3 }}>
            Obteniendo registro, espera un poco...
          </Typography>
          <CircularProgress
            sx={{ fontSize: 60 }}
            color="primary"
          />
        </Box>
      </Backdrop>

      <Box component="section" sx={style} style={{ display: formContact ? 'block' : 'none' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Tabla 1: Datos del Cliente */}
            <Grid xs={12} md={12}>
              <Typography variant="h6" component="h6">
                Datos de la solicitud
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Nombre:
                      </TableCell>
                      <TableCell>{customerData.NAME}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Registro:
                      </TableCell>
                      <TableCell>{customerData.REGISTER}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Producto ofertado:
                      </TableCell>
                      <TableCell>{customerData.PRODUCT_OFFERING}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid xs={12} md={12}>
              <Typography variant="h6" component="h6">
                Telefonos
              </Typography>

              <TableContainer component={Paper} >
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    {customerData.PHONES && customerData.PHONES.map((phone, index) => (
                      <TableRow key={index}>
                        <TableCell>{`***${phone.toString().substring(6)}`}</TableCell>
                        <TableCell align="center">Aqui va el select</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>



            {/* Tabla 3: Contacto*/}
            <Grid xs={12} md={12}>
              {/* fullWidth */}
              <FormControl fullWidth  >
                <InputLabel id="sellProduct">Selecciona un producto</InputLabel>
                <Select
                  labelId="sellProduct"
                  id="sellProduct"
                  value={product}
                  label="Selecciona un producto"
                  onChange={handleProduct}
                  required
                >
                  <MenuItem value={1}>Producto 1</MenuItem>
                  <MenuItem value={2}>Producto 2</MenuItem>
                </Select>
              </FormControl>


            </Grid>
            <Grid xs={12} md={12} >
              <Stack direction="row" spacing={2}>
                <Button
                  color="success"
                  variant="outlined"
                  type="submit"
                >Continuar</Button>
                <Button color="error" variant="outlined">Abandonar</Button>
                {showAlert && (
                  <Alert
                    // icon={<CheckIcon fontSize="inherit" />} 
                    severity="warning">
                    {missingData}
                  </Alert>
                )}

              </Stack>

            </Grid>

          </Grid>
        </form>
      </Box>


      <Box component="section" sx={style} style={{ display: formContact ?  'none' : 'block' }}>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            sss
            <Button color="error" variant="outlined" onClick={handleReturnContact}>Regresar</Button>

          </Grid>
        </form>
      </Box>
















    </>
  );
}
