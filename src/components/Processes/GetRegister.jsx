import { useState, useEffect } from "react";
import axios from "axios";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import { toast } from 'react-toastify';

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

import Ivr from "./Ivr";
import CustomerInformation from "./CustomerInformation";
import CustomerPhones from "./CustomerPhones";
import ContactCalifications from "./ContactCalifications";
import QuizProduct1 from "./QuizProduct1";
import ValidationArticle22 from "./ValidationArticle22";

export default function GetRegister() {
  const [openBackdrop, setOpenBackdrop] = useState(true); //Loading  
  const [formContact, setFormContact] = useState(true); // show or hide contact form

  const [customerData, setCustomerData] = useState([]); //Customer information
  const [contactCal, setContactCal] = useState([]);


  const [product, setProduct] = useState(0); // Product to sell
  const [phoneSell, setPhoneSell] = useState(""); // Product to sell


  const [formComplete, setFormComplete] = useState(false);

  const [article22, setFArticle22] = useState(true);


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
    setProduct(event.target.value);
  };
  const handlePhoneCall = (phoneValue) => {
    console.log(phoneValue);
    setPhoneSell(phoneValue);
  };

  const handleContact = () => {
    console.clear()
    if (product == 0) {      
      toast.warning("Selecciona un producto para continuar");

    } else {
      setFormContact(false);
      setFormComplete(true)
    }
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

        <Grid container spacing={2}>
          <Grid xs={6} md={6}>
            <CustomerInformation data={customerData} /> {/* Aqui se cargan los datos del cliente como componente */}
          </Grid>
          <Grid xs={6} md={6}>
            <CustomerPhones data={customerData} handlePhoneCall={handlePhoneCall} />  {/* Aqui se cargan los telefonos como componente */}
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid xs={6} md={6} >
            <Typography
              variant="body2"
              gutterBottom
              sx={{ display: "flex", alignItems: "center", m: 1 }}
            >
              Selecciona un producto
            </Typography>
            <FormControl sx={{ m: 1 }} size="small" fullWidth>
              <InputLabel id="sellProduct">Producto</InputLabel>
              <Select
                labelId="sellProduct"
                id="sellProduct"
                label="Selecciona un producto"
                required
                onChange={handleProduct}
                value={product}
              >
                <MenuItem disabled value={0}>
                  Selecciona un producto
                </MenuItem>
                <MenuItem value={1}>Accidentes</MenuItem>
                <MenuItem value={2}>Hospital</MenuItem>
              </Select>
            </FormControl>

            <Stack direction="row" spacing={2}
              sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
            >
              <Button color="success" variant="outlined" onClick={handleContact}>
                Continuar
              </Button>
              <Button color="error" variant="outlined">
                Abandonar
              </Button>
            </Stack>
          </Grid>
          <Grid xs={6} md={6}>
          </Grid>
        </Grid>

      </Box>

      {/* Esta caja es para el producto 1 */}
      <Box
        component="section"
        sx={style}
        style={{ display: formContact ? "none" : "block" }}
      >
        <Grid container spacing={2}>
          <Grid xs={12} md={12}>
            <ContactCalifications
              data={contactCal}
              handleReturnContact={handleReturnContact}
            />
          </Grid>
          <Grid xs={12} md={6}>
            <CustomerInformation data={customerData} />  {/* Componente para cargar informacion del cliente */}
          </Grid>
          <Grid xs={12} md={6}>
            <Ivr phone={phoneSell} /> {/* Componente para enviar a ivr */}
          </Grid>
          <Grid xs={12} md={12}>
            <ValidationArticle22  setFArticle22={setFArticle22} />
          </Grid>
        </Grid>
      </Box>

      <Box
        component="section"
        sx={style}
        style={{ display: article22 ? "none" : "block" }}
      >
        {formComplete && <QuizProduct1 product={product} />}


      </Box>
    </>
  );
}




 