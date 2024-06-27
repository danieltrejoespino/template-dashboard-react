
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Typography from '@mui/material/Typography';

export const Clima = () => {
  return <>
    <Box component="section" sx={{ p: 2, width: "100%" }}>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <a href="https://www.windy.com/-Rain-thunder-rain?rain,20.570,-100.366,11" target="_blank">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Windy.com
            </Typography>
          </a>

          <iframe
            width="1000"
            height="600"
            src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=°C&metricWind=km/h&zoom=5&overlay=wind&product=ecmwf&level=surface&lat=18.937&lon=-96.108&detailLat=20.365&detailLon=-101.541&marker=true&message=true"
          ></iframe>


        </Grid>
      </Grid>
    </Box>
  </>
}
