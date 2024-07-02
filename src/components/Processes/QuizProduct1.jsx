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
import Skeleton from '@mui/material/Skeleton';
import Box from "@mui/material/Box";

const QuizProduct1 = ({ product }) => {

  const [survey, setSurvey] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getSurvey = async () => {
      const url = "https://localhost:4001/apiCiti/getSurvey";
      const params = {
        product
      }
      try {
        const rsp = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setSurvey(rsp.data)
        setIsLoading(false);


      } catch (error) {
        console.log(error);

      }
    };
    getSurvey();
  }, []);


  // if (isLoading) {
  //   return <div>Cargando...</div>; // O cualquier componente de cargando que prefieras
  // }

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
                          <TextField
                            name={data.NAME}
                            label={data.LABEL}
                            variant="standard"
                            inputProps={{ maxLength: 10 }}
                            required={data.REQUIRED === 1}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>





        </Grid>
      </Grid>


    </>

  )
}

export default QuizProduct1