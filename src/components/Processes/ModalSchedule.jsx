import { useState, useEffect } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "dayjs/locale/es";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DigitalClock } from "@mui/x-date-pickers/DigitalClock";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";

dayjs.locale("es");

import CustomBackdrop from "./CustomBackdrop";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: "400px",
  borderRadius: "15px",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 15,
  p: 4,
  overflow: "auto",
};

const ModalSchedule = ({ open, handleClose }) => {
  const [dateSchedule, setDateSchedule] = useState(dayjs());
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const newTime = {
        hours: 15,
        minutes: 30,
      };
      setHours(newTime.hours);
      setMinutes(newTime.minutes);
    };

    updateTime();
  }, []);

  const handleDateSchedule = (newDate) => {
    console.log(newDate);
    setDateSchedule(newDate);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component="section" sx={style}>
          <Grid container spacing={2}>
            <Grid xs={12} md={6} lx={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={dateSchedule}
                  onChange={handleDateSchedule}
                />
              </LocalizationProvider>
            </Grid>
            <Grid xs={12} md={6} lx={10}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer
                  components={["DigitalClock", "MultiSectionDigitalClock"]}
                >
                  <DemoItem>
                    <DigitalClock
                      defaultValue={dayjs("2022-04-17T15:30")}
                      ampm={false}
                    />
                  </DemoItem>
                  <DemoItem>
                    <MultiSectionDigitalClock
                      defaultValue={dayjs("2022-04-17T15:30")}
                      ampm={false}
                    />
                  </DemoItem>
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
};

export default ModalSchedule;
