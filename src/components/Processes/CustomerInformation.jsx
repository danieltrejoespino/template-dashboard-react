import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";


const CustomerInformation = ({data}) => {
  return (
    <>
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
        Datos de la solicitud
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                Producto ofertado:
              </TableCell>
              <TableCell>{data.PRODUCT_OFFERING}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}


export default CustomerInformation;
