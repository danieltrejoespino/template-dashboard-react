import { Typography, Box, TextField, Button } from "@mui/material";

import { useState } from "react";
import axios from "axios";

export const TestQuery = () => {
  const [query, setQuery] = useState("select * from dual");
  const [data, setData] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = async () => {
    const url = "https://172.20.1.97:3009/api-serv/testOraQuery";
    const params = {
      query: ` ${query} `,
      campaign: "0",
    };
    try {
      const response = await axios.post(url, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      console.log("dddd");
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" gutterBottom>
          Test query (recuerda siempre agregar un WHERE)
        </Typography>
        <Box
          component="form"
          sx={{ "& > :not(style)": { m: 1, width: "100%" } }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={handleInputChange}
            value={query}
            label="Query"
            variant="standard"
          />
          <Button variant="outlined" color="success" onClick={handleSubmit}>
            Consultar
          </Button>
        </Box>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </Box>
    </>
  );
};
