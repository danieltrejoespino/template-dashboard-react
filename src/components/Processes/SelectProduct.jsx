import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const SelectProduct = ({ handleProduct, product, handleContact }) => {
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
            Producto
          </Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            padding: "1px",
            marginTop: "20px",
          }}
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            // justifyContent="center"
            sx={{ display: "flex", marginTop: "10px",marginBottom: "20px" }} // Ajusta el margen superior aquí según necesites
          >
            <FormControl size="small">
              <InputLabel id="sellProduct">Producto</InputLabel>
              <Select
                labelId="sellProduct"
                id="sellProduct"
                label="Selecciona un producto"
                required
                onChange={handleProduct}
                value={product}
                sx={{ minWidth: 200 }}
              >
                <MenuItem disabled value={0}>
                  Selecciona un producto
                </MenuItem>
                <MenuItem value={1}>Accidentes</MenuItem>
                <MenuItem value={2}>Hospital</MenuItem>
              </Select>
            </FormControl>

            <Button color="success" variant="outlined" onClick={handleContact}>
              Continuar
            </Button>
            <Button color="error" variant="outlined">
              Abandonar
            </Button>
          </Stack>
        </AccordionDetails>
      </Accordion>
    </>
  );
};

export default SelectProduct;
