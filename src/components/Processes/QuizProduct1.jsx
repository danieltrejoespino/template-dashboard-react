import { useState, useEffect } from "react";
import axios from "axios";

import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const QuizProduct1 = ({ product }) => {
  const [survey, setSurvey] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSurvey = async () => {
      const url = "https://localhost:4001/apiCiti/getSurvey";
      const params = {
        product,
      };
      try {
        const rsp = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSurvey(rsp.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getSurvey();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);    
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
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
            Cuestionario 1 -
          </Typography>

          <TableContainer component={Paper}>
            {isLoading ? (
              <>
                <Box sx={{ width: "100%" }}>
                  <Skeleton />
                  <Skeleton animation="wave" />
                  <Skeleton animation={false} />
                </Box>
              </>
            ) : (
              <Table>
                <TableBody>
                  {survey[0].DATOS_TITULAR &&
                    survey[0].DATOS_TITULAR.map((data, index) => (
                      <TableRow key={index}>
                        <TableCell>{data.LABEL}</TableCell>
                        <TableCell align="center">
                          {data.TYPE == 5 ? (
                            <TextField
                              fullWidth
                              name={data.NAME}
                              label={data.LABEL}
                              variant="standard"
                              inputProps={{ maxLength: data.LENGTH}}
                              required={data.REQUIRED === 1}
                            />
                          ) : (
                            <FormControl  size="small" fullWidth>
                              <InputLabel id="sellProduct">
                                {data.LABEL}
                              </InputLabel>
                              <Select
                                labelId="sellProduct"
                                id="sellProduct"
                                label="Selecciona un producto"
                                required={data.REQUIRED === 1}
                                // onChange={handleProduct}
                                // value={product}
                              >
                                <MenuItem disabled value={0}>
                                  Selecciona un producto
                                </MenuItem>
                                <MenuItem value={1}>Accidentes</MenuItem>
                                <MenuItem value={2}>Hospital</MenuItem>
                              </Select>
                            </FormControl>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
        </Grid>
      </Grid>
      
        <Grid item xs={12} md={12} sx={{m:2}}>
          <Box display="flex" justifyContent="center">
            {" "}
            {/* Centrar el Stack dentro de un Box */}
            <Stack spacing={2} direction="row">
              <Button  variant="contained">Guardar Solicitud</Button>
              <Button type="submit" variant="contained">Procesar Solicitud</Button>
            </Stack>
          </Box>
        </Grid>
      
      </form>
    </>
  );
};

export default QuizProduct1;
