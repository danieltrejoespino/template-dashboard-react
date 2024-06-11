// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import { useState } from "react";
import { toast } from "react-toastify";
import { Typography, Box, TextField, Button } from '@mui/material';

const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      toast.success("Nomina copiada al portapapeles!");
    })
    .catch((err) => {
      console.error("Error al copiar al portapapeles: ", err);
      toast.success("Error al copiar al portapapeles!");
    });
};

function encodeBase64(str) {
  return btoa(str);
}

function decodeBase64(str) {
  return atob(str);
}

export const Utilidades = () => {
  const [inputValue, setInputValue] = useState(0);
  const [inputCode, setInputCode] = useState(0);
  const [inputDecode, setInputDecode] = useState(0);

  const handleInputChange = (e) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };
  const handleSubmit = () => {
    // console.log(`Input Value: ${inputValue}`);
    setInputCode(encodeBase64(inputValue));
    setInputDecode(decodeBase64(inputValue));

    copyToClipboard(inputCode);
  };
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h4" gutterBottom>
          Encriptar / desencriptar
        </Typography>

        <Box sx={{ marginBottom: 2 }}>
          <TextField
            onChange={handleInputChange}
            value={inputValue}
            label="Texto"
            variant="standard"
          />
          <Button variant="outlined" color="success" onClick={handleSubmit}>
            Generar
          </Button>
        </Box>

        <Box sx={{ marginBottom: 2 }}>
          <TextField value={inputCode} label="Encode" variant="standard" />
          <TextField value={inputDecode} label="Decode" variant="standard" />
        </Box>
      <ContarCaracteres />
      </Box>
    </>
  );
};

const ContarCaracteres = () => {
  const [words, setWords] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);

  const handleWords = (e) => {
    let count = e.target.value;
    setWords(count.length);
  };

  const handleCursorPosition = (event) => {
    const position = event.target.selectionStart;
    setCursorPosition(position);
  };

  return (
    <>
        <Typography variant="h4" gutterBottom>
          Contar caracteres
        </Typography>
        <Box
          component="form"
          sx={{ "& > :not(style)": { marginBottom: 1, width: "100ch" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={handleWords}
            onClick={handleCursorPosition}
            onKeyUp={handleCursorPosition}
            id="standard-textarea"
            label="Texto a contar"
            placeholder="Texto"
            multiline
            color="secondary"
            focused
            variant="standard"
          />
          <p> Total de palabras: {words} </p>
          <p> Posición del cursor: {cursorPosition}</p>
        </Box>      
    </>
  );
};
