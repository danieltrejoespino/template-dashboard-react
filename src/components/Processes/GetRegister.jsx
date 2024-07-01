import { useState, useEffect } from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Alert from "@mui/material/Alert";
import TextField from "@mui/material/TextField";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
const style = {
  width: "100%",
  // height: '400px',
  borderRadius: "20px",
  bgcolor: "background.paper",
  border: "1px ",
  boxShadow: 1,
  p: 2,
  m: 1,
  // overflow: 'auto'
};

export default function GetRegister() {
  const [openBackdrop, setOpenBackdrop] = useState(true); //Loading
  const [showAlert, setShowAlert] = useState(false); //Validate form
  const [missingData, setMissingData] = useState(""); //validate form

  const [customerData, setCustomerData] = useState([]); //Customer information
  const [contactCal, setContactCal] = useState([]);
  const [product, setProduct] = useState(""); // Product to sell

  const [formContact, setFormContact] = useState(true); // show or hide contact form

  useEffect(() => {
    const getRegister = async () => {
      const url = "https://localhost:4001/apiCiti/getRegister";
      try {
        const rsp = await axios.post(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(rsp.data[1].contactQual);
        setCustomerData(rsp.data[0].Customer);
        setContactCal(rsp.data[1].contactQual);

        setOpenBackdrop(false);
      } catch (error) {
        console.log(error);
        setOpenBackdrop(false);
      }
    };
    getRegister();
  }, []);

  const handleProduct = (event) => {
    console.log(event.target.value);
    setProduct(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMissingData("Llena los campos faltantes");
    setShowAlert(true);
    setFormContact(false);
  };

  const handleReturnContact = () => {
    setFormContact(true);
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ mb: 3 }}>
            Obteniendo registro, espera un poco...
          </Typography>
          <CircularProgress sx={{ fontSize: 60 }} color="primary" />
        </Box>
      </Backdrop>

      <Box
        component="section"
        sx={style}
        style={{ display: formContact ? "block" : "none" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* Aqui se cargan los datos del cliente como componente */}
            <Grid xs={12} md={12}>
              <CustomerData data={customerData} />
            </Grid>
            {/* Aqui se cargan los telefonos como componente */}
            <Grid xs={12} md={12}>
              <CustomerPhones data={customerData} />
            </Grid>

            {/* Tabla 3: Contacto*/}
            <Grid xs={12} md={12}>
              {/* fullWidth */}
              <FormControl fullWidth>
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
            <Grid xs={12} md={12}>
              <Stack direction="row" spacing={2}>
                <Button color="success" variant="outlined" type="submit">
                  Continuar
                </Button>
                <Button color="error" variant="outlined">
                  Abandonar
                </Button>
                {showAlert && (
                  <Alert
                    // icon={<CheckIcon fontSize="inherit" />}
                    severity="warning"
                  >
                    {missingData}
                  </Alert>
                )}
              </Stack>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Box
        component="section"
        sx={style}
        style={{ display: formContact ? "none" : "block" }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid xs={12} md={12}>
              <QualificationsContact
                product={product}
                handleProduct={handleProduct}
                data={contactCal}
                handleReturnContact={handleReturnContact}
              />
            </Grid>
            <Grid xs={12} md={6}>
              <CustomerData data={customerData} />
            </Grid>
            <Grid xs={12} md={6}>
              <PhoneContact />
            </Grid>
            <Grid xs={12} md={12}>
              <ValidationArticle22 />
            </Grid>
          </Grid>
        </form>
      </Box>
    </>
  );
}

const CustomerData = ({ data }) => {
  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          mb: 2,
          textAlign: "center",
          backgroundColor: "#3498db",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Datos de la solicitud
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                Nombre:
              </TableCell>
              <TableCell>{data.NAME}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Registro:
              </TableCell>
              <TableCell>{data.REGISTER}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Producto ofertado:
              </TableCell>
              <TableCell>{data.PRODUCT_OFFERING}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const CustomerPhones = ({ data }) => {
  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          mb: 2,
          textAlign: "center",
          backgroundColor: "#3498db",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Telefonos
      </Typography>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            {data.PHONES &&
              data.PHONES.map((phone, index) => (
                <TableRow key={index}>
                  <TableCell>{`***${phone.toString().substring(6)}`}</TableCell>
                  <TableCell align="center">
                    <Button color="info" variant="outlined">
                      Marcar tel {index + 1}
                    </Button>
                  </TableCell>
                  <TableCell align="center">Aqui va el select</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const QualificationsContact = ({
  data,
  product,
  handleProduct,
  handleReturnContact,
}) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} md={12}>
          <Typography
            variant="h6"
            component="h6"
            sx={{
              mb: 2,
              textAlign: "center",
              backgroundColor: "#3498db",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Calificaciones del registro
          </Typography>
        </Grid>
        <Grid xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="sellProduct">
              Selecciona el motivo por el cual no finalizo la venta
            </InputLabel>
            <Select
              labelId="sellProduct"
              id="sellProduct"
              value={product}
              label="Selecciona un producto"
              onChange={handleProduct}
              required
            >
              {data &&
                data.map((cal, index) => (
                  <MenuItem value={index}> {cal.ESTATUS}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} md={3}>
          <Button
            fullWidth
            color="error"
            variant="outlined"
            onClick={handleReturnContact}
          >
            Regresar
          </Button>
        </Grid>
        <Grid xs={12} md={3}>
          <Button
            fullWidth
            color="info"
            variant="outlined"
            // onClick={handleReturnContact}
          >
            Calificar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const PhoneContact = () => {
  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          mb: 2,
          textAlign: "center",
          backgroundColor: "#3498db",
          color: "white",
          borderRadius: "5px",
        }}
      >
        IVR
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow key={1}>
              <TableCell key={2}>
                <p>{`***`}</p>
              </TableCell>
              <TableCell key={3} align="center">
                <Button color="info" variant="outlined" fullWidth>
                  Marcar tel
                </Button>
              </TableCell>
              <TableCell key={4} align="center">
                <Button color="error" variant="outlined" fullWidth>
                  Enviar a IVR
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const ValidationArticle22 = () => {
  const label = { inputProps: { placeholder: "Enter text" } };

  return (
    <>
      <Typography
        variant="h6"
        component="h6"
        sx={{
          mb: 2,
          textAlign: "center",
          backgroundColor: "#3498db",
          color: "white",
          borderRadius: "5px",
        }}
      >
        Validación artículo 22
      </Typography>

      <Typography variant="body2" gutterBottom sx={{ color: "red" }}>
        El cliente debe responder la siguiente pregunta.
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ marginLeft: "10px" }}>
        SI USTED ME LO PERMITE, LE COMENTARÉ LOS BENEFICIOS DEL SEGURO.
        <Switch {...label} />
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ marginLeft: "10px" }}>
        ME PERMITE REGRESARLE LA LLAMADA EN 2 MESES?
        <Switch {...label} />
      </Typography>

      <Typography variant="subtitle" gutterBottom sx={{ color: "red" }}>
        Formulario de validaciones.
      </Typography>

      <FormControl  size="small">
        <InputLabel id="sellProduct">Selecciona un plan</InputLabel>
        <Select
          labelId="sellProduct"
          id="sellProduct"
          label="Selecciona un producto"
          required
          sx={{ marginLeft: "10px" }}
        >
          <MenuItem value={1}>10000</MenuItem>
          <MenuItem value={2}>25000</MenuItem>
        </Select>
      </FormControl>
 
        <TextField
          name=" PRIMA_MENSUAL"
          label=" PRIMA MENSUAL "
          variant="standard"
          sx={{ marginLeft: "10px" }}
          defaultValue="Small"
          size="small"
        />
        <TextField
          name="TOTAL_ANUAL"
          label="TOTAL_ANUAL"
          variant="standard"
          defaultValue="Small"
          size="small"
          sx={{ marginLeft: "10px" }}
        />
 

      <FormControl  sx={{ marginLeft: "10px" }} size="small">
        <InputLabel id="paymentMethod">Método de pago</InputLabel>
        <Select
          labelId="paymentMethod"
          id="paymentMethod"
          label="Selecciona un método de pago"
          required
        >
          <MenuItem value={1}>2789-TDC</MenuItem>
          <MenuItem value={2}>1234-TDC</MenuItem>
        </Select>
      </FormControl>

      <Typography variant="subtitle" gutterBottom sx={{ color: "red" }}>
        El cliente debe autenticarse con cualquiera de las siguientes preguntas
        antes de poder continuar.
      </Typography>

        <TextField
          name="TOTAL_ANUAL"
          label="Fecha Nacimiento? (yyyymmdd)"
          variant="standard"
          sx={{ marginLeft: "10px" }}
        />

        <TextField
          name="TOTAL_ANUAL"
          label="Codigo Postal?"
          variant="standard"
          sx={{ marginLeft: "10px" }}
        />

        <TextField
          name="TOTAL_ANUAL"
          label="Colonia?"
          variant="standard"
          sx={{ marginLeft: "10px" }}
        />

    </>
  );
};
