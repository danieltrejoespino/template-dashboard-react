import { useState, useEffect } from "react";

import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import CustomSweetAlert from "./CustomSweetAlert";

const PhoneContact = ({ phone }) => {

  const [alertProps, setAlertProps] = useState({
    show: false,
    title: '',
    text: '',
    icon: "",
    showConfirmButton: true,
    timer: 0,

  });

  const handleAlertClose = () => {
    setAlertProps({ ...alertProps, show: false });
  };


  const handleClick = (event) => {
    // const phoneValue = event.currentTarget.getAttribute("data-phone");
    // handlePhoneCall(phoneValue);

    setAlertProps({
      show: true,
      title: 'Marcando telefono',
      icon: "success",
      text: `***${phone.toString().substring(6)}`,
      timer: 1500,
      showConfirmButton: false,
    });

  };


  return (
    <>
      <CustomSweetAlert
        show={alertProps.show}
        title={alertProps.title}
        text={alertProps.text}
        icon={alertProps.icon}
        showConfirmButton={alertProps.showConfirmButton}
        timer={alertProps.timer}
        onClose={handleAlertClose}
      />
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
          sx={{
            textAlign: "center",
            backgroundColor: "#3498db",
            minHeight: "40px", // Reducir la altura mínima
            "& .MuiAccordionSummary-content": {
              margin: 0, // Eliminar el margen del contenido
            },
            "& .MuiAccordionSummary-expandIconWrapper": {
              marginRight: "1px", // Reducir el margen del ícono de expansión
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
            Telefono
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "1px", // Reducir el padding de AccordionDetails
          }}
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableBody>
                <TableRow key={1}>
                  <TableCell key={2}>
                    {`***${phone.toString().substring(5)}`}
                  </TableCell>
                  <TableCell key={3} align="center">
                    <Button
                      color="info"
                      variant="outlined"
                      fullWidth
                      data-phone={phone}
                      onClick={handleClick}
                    >
                      Marcar tel
                    </Button>
                  </TableCell>
                  {/* <TableCell key={4} align="center">
                    <Button color="error" variant="outlined" fullWidth>
                      Enviar a IVR
                    </Button>
                  </TableCell> */}
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default PhoneContact;
