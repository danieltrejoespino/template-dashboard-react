import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

const Ivr = ({phone}) => {
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
        IVR
      </Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableBody>
            <TableRow key={1}>
              <TableCell key={2}>
                <p>{`***${phone.toString().substring(6)}`}</p>
              </TableCell>
              <TableCell key={3} align="center">
                <Button color="info" variant="outlined" fullWidth                 
                >
                  Marcar tel
                </Button>
              </TableCell>
              <TableCell key={4} align="center">
                <Button color="error" variant="outlined" fullWidth>
                  Enviar a IVR
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}


export default Ivr;
