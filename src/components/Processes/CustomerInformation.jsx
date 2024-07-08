import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";



import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { color } from "highcharts";


const CustomerInformation = ({ data }) => {
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
            Datos de la solicitud
          </Typography>
        </AccordionSummary>
        <AccordionDetails
                    sx={{
              padding: '1px', // Reducir el padding de AccordionDetails
            }}
        >


          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Nombre:
                  </TableCell>
                  <TableCell>{data.NAME}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Registro:
                  </TableCell>
                  <TableCell>{data.REGISTER}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Rfc:
                  </TableCell>
                  <TableCell>{data.RFC}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell component="th" scope="row">
                    Oferta:
                  </TableCell>
                  <TableCell>
                    <p className="text-red-400">
                    {data.PRODUCT_OFFERING}
                    </p>

                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

        </AccordionDetails>
      </Accordion>
    </>
  );
}


export default CustomerInformation;
