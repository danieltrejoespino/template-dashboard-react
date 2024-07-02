import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

const ContactCalifications = ({data,handleReturnContact}) => {
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
            Calificaciones del registro
          </Typography>
        </Grid>
        <Grid xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="sellProduct">
              Selecciona el motivo por el cual no finalizo la venta
            </InputLabel>
            <Select
              labelId="sellProduct"
              id="sellProduct"
              label="Selecciona un producto"
              required
            >
              {data &&
                data.map((cal, index) => (
                  <MenuItem  key={index} value={cal.U_ESTATUSLLAMADA}> {cal.ESTATUS}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid xs={12} md={3}>
          <Button
            fullWidth
            color="error"
            variant="outlined"
            onClick={handleReturnContact}
          >
            Regresar
          </Button>
        </Grid>
        <Grid xs={12} md={3}>
          <Button
            fullWidth
            color="info"
            variant="outlined"
          // onClick={handleReturnContact}
          >
            Calificar
          </Button>
        </Grid>
      </Grid>
    </>
  );
};


export default ContactCalifications;
