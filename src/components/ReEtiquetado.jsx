import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
// import CheckIcon from '@mui/icons-material/Check';
import SendIcon from "@mui/icons-material/Send";
import Button from "@mui/material/Button";

export const ReEtiquetado = () => {



  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    let month = today.getMonth() + 1;
    let day = today.getDate();

    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;

    return `${year}-${month}-${day}`;
  };

  function restarUnMes(fecha) {
    let nuevaFecha = new Date(fecha);
    nuevaFecha.setMonth(nuevaFecha.getMonth() - 1);
    const year = nuevaFecha.getFullYear();
    let month = nuevaFecha.getMonth() + 1; 
    let day = nuevaFecha.getDate();
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    return `${year}-${month}-${day}`;
  }

  // const [date1, setDate1] = useState(getCurrentDate());
  const [formValues, setFormValues] = useState({
    date1: getCurrentDate(),
    date2: getCurrentDate(),
  });
  const [rsptaDuplicados, setRsptaDuplicados] = useState("");
  const [showExt, setShowExt] = useState(false);
  const [showExt2, setShowExt2] = useState(false);
  const [rsptaReEtiquetado, setEsptaReEtiquetado] = useState([]);

  const handleDate = (e) => {
    const { name, value } = e.target;
    console.log(formValues);
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const duplicado = async () => {
      try {
        const fechas = {
          fechaInicio: formValues.date1,
          fechaFin: formValues.date2,
        };

        const url = "http://172.20.1.89:3000/api/consultaDuplicadosGrab";
        const rspta = await axios.post(url, fechas, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(rspta.data[0].duplicados);
        if (rspta.data[0].duplicados == 1) {
          setRsptaDuplicados("Existen duplicados en este rango de fechas");
          setTimeout(() => {
            setShowExt(true);
            setTimeout(() => {
              setShowExt(false);
            }, 8000);
          }, 1000);
        } else {
          setRsptaDuplicados("Sin duplicados en este rango de fechas");
        }
      } catch (error) {
        console.log(error);
      }
    };

    duplicado();
  };

  const handleEtiquetado = () => {

    const rspta = async () => {
      let fechaConUnMesMenos = restarUnMes(formValues.date1);
      try {
        const fechas = {
          fechaInicio: fechaConUnMesMenos,
          fechaFin: formValues.date2,
        };
        const url = "http://172.20.1.89:3000/api/reEtiquetado";
        const rspta = await axios.post(url, fechas, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // console.log(rspta.data);
        setEsptaReEtiquetado(rspta.data);
        setShowExt2(true);
      } catch (error) {
        console.log(error);
      }
    };

    rspta()
  };

  return (
    <>
      <Box component="section" sx={{ p: 2, width: "100%" }}>
        <Grid container spacing={2}>
          <Grid xs={3}>
            <TextField
              name="date1"
              type="date"
              // value={formValues.owner}
              // onChange={handleInputChange}
              label="Fecha inicio"
              variant="standard"
              fullWidth
              value={formValues.date1}
              onChange={handleDate}
            />
          </Grid>
          <Grid xs={3}>
            <TextField
              name="date2"
              type="date"
              value={formValues.date2}
              onChange={handleDate}
              label="Fecha fin"
              variant="standard"
              fullWidth
            />
          </Grid>
          <Grid xs={4}>
            <IconButton
              type="submit"
              color="success"
              aria-label="add"
              onClick={handleSubmit}
            >
              Consultar
              <SearchIcon sx={{ fontSize: 30 }} />
            </IconButton>
          </Grid>
          <Grid xs={12}>
            {showExt && (
              <Alert variant="filled" severity="warning">
                {rsptaDuplicados}
              </Alert>
            )}
          </Grid>

          <Grid xs={4}>
            <Button
              variant="outlined"
              color="warning"
              onClick={handleEtiquetado}
            >
              Comenzar re-etiquetado
              <SendIcon sx={{ fontSize: 30 }} />
            </Button>
          </Grid>
          <Grid xs={12}>
            {showExt2 && (
              <Alert variant="filled" severity="success">
                {JSON.stringify(rsptaReEtiquetado)}
              </Alert>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
