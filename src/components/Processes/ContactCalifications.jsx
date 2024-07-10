import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ContactCalifications = ({ handleReturnContact }) => {
  return (
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
              Calificaciones del registro
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: '8px', // Reducir el padding de AccordionDetails
            }}
          >
            <Grid container spacing={2}>
              <Grid  xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="sellProduct">
                    Selecciona el motivo por el cual no finalizó la venta
                  </InputLabel>
                  <Select
                    labelId="sellProduct"
                    id="sellProduct"
                    label="Selecciona un producto"
                    required
                  >
                    {/* {data &&
                      data.map((cal, index) => (
                        <MenuItem key={index} value={cal.U_ESTATUSLLAMADA}> {cal.ESTATUS}</MenuItem>
                      ))} */}
                  </Select>
                </FormControl>
              </Grid>
              <Grid  xs={12} md={3}>
                <Button
                  fullWidth
                  color="error"
                  variant="outlined"
                  onClick={handleReturnContact}
                >
                  Regresar
                </Button>
              </Grid>
              <Grid  xs={12} md={3}>
                <Button
                  fullWidth
                  color="info"
                  variant="outlined"
                >
                  Calificar
                </Button>
              </Grid>
            </Grid>
            <Grid  xs={12} md={12} sx={{m:1}}>                
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};


export default ContactCalifications;
