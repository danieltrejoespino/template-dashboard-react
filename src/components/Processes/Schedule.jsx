import { useState, useEffect } from "react";
import axios from "axios";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "dayjs/locale/es";
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

dayjs.locale("es");

const Schedule = ({ surveyAct, setSurveyAct }) => {
  const [dateSchedule, setDateSchedule] = useState(dayjs());

  const handleDateSchedule = (newDate) => {
    setDateSchedule(newDate);    
    if (dateSchedule == "") {
      toast.warning("Selecciona un dia a buscar");
    }
  };

  return (
    <>
      <Grid component="section" sx={style} spacing={2}>
        <Grid xs={12}>
          <Accordion defaultExpanded sx={{ width: "100%" }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                textAlign: "center",
                backgroundColor: "#3498db",
                minHeight: "40px",
                "& .MuiAccordionSummary-content": {
                  margin: 0,
                },
                "& .MuiAccordionSummary-expandIconWrapper": {
                  marginRight: "8px",
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
                  width: "100%",
                  padding: "4px", // Reducir el padding
                  fontSize: "1rem", // Reducir el tamaño de fuente
                }}
              >
                Agenda
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: "1px", // Reducir el padding de AccordionDetails
              }}
            >
              <Grid container spacing={2}>
                <Grid xs={12} md={6} lx={2}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar
                      value={dateSchedule}
                      onChange={handleDateSchedule}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid xs={12} md={6} lx={10}>
                  <TblSchedule date={dateSchedule} surveyAct={setSurveyAct} />
                </Grid>
              </Grid>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
};

const TblSchedule = ({ date,surveyAct }) => {
  const [schedules, setSchedules] = useState([]);
  const [openBackdrop, setOpenBackdrop] = useState(true); //Loading component

  const hours = [
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
    { hour: "08:30:00" },
  ];

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



  const handleClick = (event) => {
    const surveySchedule = event.currentTarget.getAttribute("data-phone");
    console.log(surveySchedule)
    surveyAct(1)

  };


  return (
    <>
      <CustomBackdrop open={openBackdrop} text={"Obteniendo datos..."} />

      <TableContainer
        component={Paper}
        style={{ height: 400, overflowY: "auto" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center" colSpan={3}>
                Agendas del dia - {date.format("DD/MM/YYYY")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {hours &&
              hours.map((data, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="left">Hora- {data.hour}</TableCell>
                  <TableCell align="left">Agenda</TableCell>
                  <TableCell align="right">
                    <Button
                      color="success"
                      variant="outlined"
                      data-phone={data.hour}
                      onClick={handleClick}
                    >
                      Continuar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default Schedule;

// https://mui.com/x/react-date-pickers/digital-clock/
