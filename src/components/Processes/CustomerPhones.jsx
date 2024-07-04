import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/material/Unstable_Grid2";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";


const CustomerPhones = ({ data, handlePhoneCall,setPhoneSelected,phoneSelected }) => {
  const handleClick = (event) => {
    const phoneValue = event.currentTarget.getAttribute("data-phone");
    handlePhoneCall(phoneValue);
  };

  return (
    <>
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
            Telefonos disponibles
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
                {data.PHONES &&
                  data.PHONES.map((phone, index) => (
                    <TableRow key={index}>
                      <TableCell>{`***${phone
                        .toString()
                        .substring(6)}`}</TableCell>
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
                      <TableCell align="center">

                        <FormControl size="small">
                          <InputLabel id="sellProduct">Calificacion</InputLabel>
                          <Select
                            labelId="sellProduct"
                            id="sellProduct"
                            // label="Selecciona un producto"
                            required
                            onChange={setPhoneSelected}
                            value={phoneSelected}
                            sx={{ minWidth: 200 }}
                          >
                            <MenuItem disabled value={0}>
                              Selecciona una calificacion
                            </MenuItem>
                            <MenuItem value={1}>Accidentes</MenuItem>
                            <MenuItem value={2}>Hospital</MenuItem>
                          </Select>
                        </FormControl>


                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default CustomerPhones;
