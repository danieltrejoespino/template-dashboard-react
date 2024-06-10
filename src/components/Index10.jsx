import { Header } from "./Header";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";


import Page404 from './Page404'
import ProgressSpinner from './ProgressSpinner'

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";



export const Index10 = () => {
  const [rowData, setRowData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const columnDefs = [
    {
      headerName: "CLAVE",
      field: "CLAVE",
      flex: 1,
      filter: true,
      floatingFilter: true,
      editable: true
    },
    {
      headerName: "NOMBRE",
      field: "NOMBRE",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "APELLIDO_PATERNO",
      field: "APELLIDO_PATERNO",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "APELLIDO_MATERNO",
      field: "APELLIDO_MATERNO",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "FECHA_NAC",
      field: "FECHA_NAC",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "NOMBRE_DEPARTAMENTO",
      field: "NOMBRE_DEPARTAMENTO",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "EMPRESA",
      field: "EMPRESA",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "EQUIPO",
      field: "EQUIPO",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "HORA",
      field: "HORA",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
    { headerName: "FOTO", field: "CLAVE", cellRenderer: ImageRender },
  ];

  const pagination = true;
  const paginationPageSize = 10;
  const paginationPageSizeSelector = [10, 20, 100, 500, 1000];

  const fetchData = useCallback(async () => {
    setLoading(true);
    const url = "https://172.20.1.97:3009/api-serv/testOraProcedure";
    // const url = "https://172.20.2.57:3009/api-serv/testOraProcedure";
    const params = {
      campaign: "1",
      nameProcedure: "SPS_INFO",
      parameters: {
        specify: "",
        fecha: "",
        hora: "",
        "access":""
      },
    };
    try {
      const rspta = await axios.post(url, params, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setRowData(rspta.data);
      setError(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);







  return (
    <>
      <Header /> {/* Este componente no se volverá a renderizar */}
      <MainContent
        rowData={rowData}
        loading={loading}
        error={error}        
        columnDefs={columnDefs}
        pagination={pagination}
        paginationPageSize={paginationPageSize}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </>
  );
};

// Componente para el contenido principal
const MainContent = ({
  rowData,
  loading,
  error,
  columnDefs,
  pagination,
  paginationPageSize,
  paginationPageSizeSelector,
}) => {
  if (loading) return (<ProgressSpinner/>);
  if (error) return (<Page404 message={error.message}  />)
  

  return (
    <>
      <div className="text-center">
        <h1 className="mb-10 mt-2 text-4xl font-bold tracking-tight text-gray-900 ">
          Credenciales
        </h1>
      </div>
      <div
        className={"ag-theme-quartz-dark"}
        style={{ width: "100%", height: "100%" }}
      >
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          domLayout="autoHeight"
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>
    </>
  );
};


const ImageRender = (props) => {

  const [open, setOpen] = useState(false);
  const [idUser, setidUser] = useState('');
  const handleOpen = () => {
    setidUser(props.value)
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  return <>
    <img
      src={`http://172.20.1.79/fotos/Fotos/${props.value}.jpg`}
      alt="Foto"
      style={{ width: "40px", height: "40px", borderRadius: "10px" }}
      onClick={handleOpen}
      className="imagenRedondeada"
      // border-radius: 10px
    />
    <ModalMui open={open} handleClose={handleClose} identificador={idUser} />

    </>
};


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


function ModalMui({ open, handleClose, identificador }) {
  return (
    <div>
      {/* <Button onClick={handleOpen}>Open modal</Button> */}
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
    </div>
  );
}
