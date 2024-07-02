import { useState, useEffect } from "react";

import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";

const ValidationArticle22 = ({ setFArticle22 }) => {
  const [switchChecked, setSwitchChecked] = useState(false);

  const handleSwitchChange = (event) => {
    console.log(event.target.checked)
    setSwitchChecked(event.target.checked);
    if (switchChecked ) {
      setFArticle22(true);      
    }else{
      setFArticle22(false);      
    }
  };

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
        <Switch
          checked={switchChecked}
          onChange={handleSwitchChange}
          {...label}
        />
      </Typography>
      <Typography variant="body2" gutterBottom sx={{ marginLeft: "10px" }}>
        ME PERMITE REGRESARLE LA LLAMADA EN 2 MESES?
        <Switch {...label} />
      </Typography>
      <Typography variant="subtitle" gutterBottom sx={{ color: "red" }}>
        Formulario de validaciones.
      </Typography>

      <Typography
        variant="body2"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
      >
        Tipo de plan
        <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
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
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
      >
        Prima mensual:
        <TextField
          name="TOTAL_ANUAL"
          label="Prima mensual: "
          variant="filled"
          sx={{ marginLeft: "10px" }}
          size="small"
        />
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
      >
        Total anual
        <TextField
          name="TOTAL_ANUAL"
          label="Total anual: "
          variant="filled"
          sx={{ marginLeft: "10px" }}
          size="small"
        />
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
      >
        Metodo de pago
        <FormControl sx={{ m: 1, minWidth: 220 }} size="small">
          <InputLabel id="sellProduct">Metodo de pago</InputLabel>
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
      </Typography>
      <Typography variant="subtitle" gutterBottom sx={{ color: "red" }}>
        El cliente debe autenticarse con cualquiera de las siguientes preguntas
        antes de poder continuar.
      </Typography>
      <Typography
        variant="body2"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
      >
        Fecha nacimiento (YYYY MM DD)
        <TextField
          name="TOTAL_ANUAL"
          label="Fecha Nacimiento"
          variant="filled"
          sx={{ marginLeft: "10px" }}
          size="small"
        />
      </Typography>

      <Typography
        variant="body2"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
      >
        Codigo postal
        <TextField
          name="TOTAL_ANUAL"
          label="CP"
          variant="filled"
          sx={{ marginLeft: "10px" }}
          size="small"
        />
      </Typography>

      <Typography
        variant="body2"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
      >
        Colonia
        <TextField
          name="TOTAL_ANUAL"
          label="Colonia"
          variant="filled"
          sx={{ marginLeft: "10px" }}
          size="small"
        />
      </Typography>
    </>
  );
};

export default ValidationArticle22;
