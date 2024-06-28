import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
// import Button from '@mui/material/Button';
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import TextField from "@mui/material/TextField";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

const paginationOptions = {
  rowsPerPageText: "Filas por página:",
  rangeSeparatorText: "de",
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",
};

const ExpandedComponent = ({ data }) => (
  <div style={{ padding: "10px", backgroundColor: "#424242" }}>
    <p>Edad: {data.HORA}</p>
    <p>Dependientes: *****</p>
    <p>Direccion: {data.HORA}</p>
  </div>
);

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalMui = ({ open, handleClose, identificador }) => (
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Nomina : {identificador}
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <img
          src={`http://172.20.1.79/fotos/Fotos/${identificador}.jpg`}
          alt="Foto"
          style={{ width: "600px", borderRadius: "10px" }}
        />
      </Typography>
    </Box>
  </Modal>
);

export const Index11 = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [selectedClave, setSelectedClave] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const url = "https://172.20.1.97:3009/api-serv/testOraProcedure";
        const params = {
          campaign: "1",
          nameProcedure: "SPS_INFO",
          parameters: {
            specify: "",
            fecha: "",
            hora: "",
            access: "",
          },
        };
        const rspta = await axios.post(url, params, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(rspta.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getData();
  }, []);

  const columns = [
    {
      name: "CLAVE",
      selector: (row) => row.CLAVE,
      sortable: true,
    },
    {
      name: "NOMBRE",
      selector: (row) => row.NOMBRE,
      sortable: true,
    },
    {
      name: "APELLIDO_PATERNO",
      selector: (row) => row.APELLIDO_PATERNO,
      sortable: true,
    },
    {
      name: "APELLIDO_MATERNO",
      selector: (row) => row.APELLIDO_MATERNO,
      sortable: true,
    },
    {
      name: "FECHA_NAC",
      selector: (row) => row.FECHA_NAC,
      sortable: true,
    },
    {
      name: "NOMBRE_DEPARTAMENTO",
      selector: (row) => row.NOMBRE_DEPARTAMENTO,
      sortable: true,
    },
    {
      name: "EMPRESA",
      selector: (row) => row.EMPRESA,
      sortable: true,
    },
    {
      name: "EQUIPO",
      selector: (row) => row.EQUIPO,
      sortable: true,
    },
    {
      name: "HORA",
      selector: (row) => row.HORA,
      sortable: true,
    },
    {
      name: "FOTO",
      cell: (row) => (
        <img
          src={`http://172.20.1.79/fotos/Fotos/${row.CLAVE}.jpg`}
          alt={row.CLAVE}
          style={{ width: "50px", height: "50px", borderRadius: "10px",cursor: "pointer" }}
          onClick={() => handleImageClick(row.CLAVE)}
        />
      ),
      ignoreRowClick: false,
      allowOverflow: true,
      button: true,
    },
  ];

  const filteredData =
    searchText.length === 0
      ? data
      : data.filter(
          (item) =>
            (item.CLAVE &&
              item.CLAVE.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (item.NOMBRE &&
              item.NOMBRE.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (item.APELLIDO_PATERNO &&
              item.APELLIDO_PATERNO.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (item.APELLIDO_MATERNO &&
              item.APELLIDO_MATERNO.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (item.FECHA_NAC &&
              item.FECHA_NAC.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (item.NOMBRE_DEPARTAMENTO &&
              item.NOMBRE_DEPARTAMENTO.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (item.EMPRESA &&
              item.EMPRESA.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (item.EQUIPO &&
              item.EQUIPO.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase())) ||
            (item.HORA &&
              item.HORA.toString()
                .toLowerCase()
                .includes(searchText.toLowerCase()))
        );

  const handleImageClick = (clave) => {
    setSelectedClave(clave);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  return (
    <>
      <ModalMui
        open={openModal}
        handleClose={handleClose}
        identificador={selectedClave}
      />
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box component="section" sx={{ p: 2, width: "100%" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={6}></Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <TextField
              label="Buscar"
              variant="outlined"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <DataTable
              theme="dark"
              title="Extensiones"
              columns={columns}
              data={filteredData}
              progressPending={loading}
              pagination
              paginationComponentOptions={paginationOptions}
              sortIcon={<ArrowDownwardIcon />}
              expandableRows
              expandableRowsComponent={ExpandedComponent}
              subHeader
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
