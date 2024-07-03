import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Grid from "@mui/material/Unstable_Grid2";

const CustomerPhones = ({ data, handlePhoneCall }) => {


  const handleClick = (event) => {
    const phoneValue = event.currentTarget.getAttribute('data-phone');
    handlePhoneCall(phoneValue);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Accordion defaultExpanded sx={{ width: '100%' }}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
              sx={{
                textAlign: "center",
                backgroundColor: "#3498db",
                minHeight: '40px', // Reducir la altura mínima
                '& .MuiAccordionSummary-content': {
                  margin: 0, // Eliminar el margen del contenido
                },
                '& .MuiAccordionSummary-expandIconWrapper': {
                  marginRight: '8px', // Reducir el margen del ícono de expansión
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
                Telefonos
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: '8px', // Reducir el padding de AccordionDetails
              }}
            >
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableBody>
                    {data.PHONES &&
                      data.PHONES.map((phone, index) => (
                        <TableRow key={index}>
                          <TableCell>{`***${phone.toString().substring(6)}`}</TableCell>
                          <TableCell align="center">
                            <Button
                              color="info"
                              variant="outlined"
                              data-phone={phone}
                              onClick={handleClick}
                            >
                              Marcar tel {index + 1}
                            </Button>
                          </TableCell>
                          <TableCell align="center">Aqui va el select</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>


    </>
  );
};


export default CustomerPhones;

