import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CustomBackdrop = ({open,text}) => {
  return (
    <>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" component="h6" sx={{ mb: 3 }}>
            {text}
          </Typography>
          <CircularProgress sx={{ fontSize: 60 }} color="primary" />
        </Box>
      </Backdrop>
    </>
  )
}

export default CustomBackdrop