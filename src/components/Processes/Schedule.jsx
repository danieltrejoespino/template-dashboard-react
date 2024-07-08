import { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import CustomBackdrop from "./CustomBackdrop";


const style = {
  width: "100%",
  borderRadius: "20px",
  bgcolor: "background.paper",
  border: "1px ",
  boxShadow: 1,
  p: 2,
  m: 1,
};



const Schedule = () => {
  const [dateSchedule, setDateSchedule] = useState('')
  const [ScheduleComplete, setScheduleComplete] = useState(false);


  const handleDateSchedule = (e) => {
    console.log(e.target.value);
    setDateSchedule(e.target.value)


  }  
  
  const handleSchedule = () => {
    if (dateSchedule == '') {
      alert('selecciona un dia a buscar')
    }else{
      setScheduleComplete(true)
    }
  }

  return (
    <>
      <Grid
        component="section"
        sx={style}
        spacing={2}>
        <Grid xs={12}>
          <Accordion defaultExpanded sx={{ width: '100%' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                textAlign: "center",
                backgroundColor: "#3498db",
                minHeight: '40px',
                '& .MuiAccordionSummary-content': {
                  margin: 0,
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  marginRight: '8px',
                },
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                sx={{
                  textAlign: "center",
                  backgroundColor: "#3498db",
                  color: "white",
                  borderRadius: "5px",
                  width: '100%',
                  padding: '4px', // Reducir el padding
                  fontSize: '1rem', // Reducir el tamaño de fuente
                }}
              >
                Agenda
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: '1px', // Reducir el padding de AccordionDetails
              }}
            >
              <Grid container spacing={2}>
                <Grid xs={12} md={6} lx={6}>

                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    // justifyContent="center"
                    sx={{ display: "flex", marginTop: "10px", margin: "20px" }} // Ajusta el margen superior aquí según necesites
                  >
                    <TextField
                      // fullWidth
                      name='schedule'
                      type="date"
                      sx={{ minWidth: 200 }}
                      value={dateSchedule}
                      onChange={handleDateSchedule}
                      variant="standard"
                    />

                    <Button color="info" variant="outlined"
                    onClick={handleSchedule}
                    // sx={{ minWidth: 200 }}
                    >
                      Buscar agendas
                    </Button>
                  </Stack>


                </Grid>
                <Grid xs={12} md={6} lx={6}>
                sss
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid xs={12} md={12} lx={12}>
                {ScheduleComplete && <TblSchedule date={dateSchedule} />}
                </Grid>
              </Grid>

            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  )
}

const TblSchedule = ({date}) => {
  const [schedules, setSchedules] = useState([])
  const [openBackdrop, setOpenBackdrop] = useState(true); //Loading component 

  useEffect(() => {
    const getRegister = async () => {
      const url = "https://localhost:4001/apiCiti/getRegister";
      try {
        const rsp = await axios.post(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(rsp.data);       
        setOpenBackdrop(false);        
      } catch (error) {
        console.log(error);
        
      }
    };
    getRegister();
  }, [date]);
  return (
    <>
      <CustomBackdrop open={openBackdrop} text={'Obteniendo datos...'} />
      <h1>sss</h1>
    </>
  )
}


export default Schedule