import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";



const CustomerPhones = ({ data,handlePhoneCall }) => {


  const handleClick = (event) => {
    const phoneValue = event.currentTarget.getAttribute('data-phone');
    handlePhoneCall(phoneValue);
  };

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
        Telefonos
      </Typography>

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
                      data-phone= {phone}
                      onClick ={handleClick}
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
    </>
  );
};


export default CustomerPhones;

 