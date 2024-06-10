import { Header } from "./Header";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState } from "react";
import { toast } from "react-toastify";

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
      <Header />

      <div className="lg:flex lg:items-center lg:justify-between mb-8 mt-2">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Encriptar / desencriptar
          </h2>
        </div>
      </div>

      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
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

      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "25ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField value={inputCode} label="Encode" variant="standard" />
        <TextField value={inputDecode} label="Decode" variant="standard" />
      </Box>

      <ContarCaracteres />
    </>
  );
};

const ContarCaracteres = () => {
  const [ words, setWords ] = useState('')

  const handleWords =(e)=> {
    let count = e.target.value
    setWords(count.length);    
  }

  return (
    <>
      <div className="lg:flex lg:items-center lg:justify-between mb-8 mt-5">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Contar caracteres
          </h2>
        </div>
      </div>

      <Box
        component="form"
        sx={{ "& > :not(style)": { m: 1, width: "100ch" } }}
        noValidate
        autoComplete="off"
      >
        <TextField
          onChange={handleWords}
          id="standard-textarea"
          label="Texto a contar"
          placeholder="Texto"
          multiline
          variant="standard"
        />
        <p> Total de palabras: {words}</p>
      </Box>
    </>
  );
};
