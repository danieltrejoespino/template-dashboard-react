import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";


 const SelectProduct = ({handleProduct,product,handleContact}) => {
  return (
    <>


      <Typography
        variant="body2"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", m: 1 }}
      >
        Selecciona un producto
      </Typography>
      <FormControl sx={{ m: 1 }} size="small" fullWidth>
        <InputLabel id="sellProduct">Producto</InputLabel>
        <Select
          labelId="sellProduct"
          id="sellProduct"
          label="Selecciona un producto"
          required
          onChange={handleProduct}
          value={product}
        >
          <MenuItem disabled value={0}>
            Selecciona un producto
          </MenuItem>
          <MenuItem value={1}>Accidentes</MenuItem>
          <MenuItem value={2}>Hospital</MenuItem>
        </Select>
      </FormControl>

      <Stack direction="row" spacing={2}
        sx={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
      >
        <Button color="success" variant="outlined" onClick={handleContact}>
          Continuar
        </Button>
        <Button color="error" variant="outlined">
          Abandonar
        </Button>
      </Stack>
    </>
  )
}

export default SelectProduct