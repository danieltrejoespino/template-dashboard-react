import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { CSVLink } from 'react-csv';
import DataTable from 'react-data-table-component';

import { NewPhoneExt  } from "./NewPhoneExt";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import Button from '@mui/material/Button';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import TextField from "@mui/material/TextField";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
  {
    name: 'NOMBRE_MOSTRAR',
    selector: row => row.NOMBRE_MOSTRAR,
    sortable: true,
  },
  {
    name: 'EXTENSION',
    selector: row => row.EXTENSION,
    sortable: true,
  },
  {
    name: 'ASIGNADO',
    selector: row => row.ASIGNADO,
    sortable: true,
  },
  {
    name: 'WORK_EXT',
    selector: row => row.WORK_EXT,
    sortable: true,
  },
  {
    name: 'IP',
    selector: row => row.IP,
    sortable: true,
  },
  {
    name: 'UID_LDAP',
    selector: row => row.UID_LDAP,
    sortable: true,
  },
  {
    name: 'NOMBRE_USUARIO',
    selector: row => row.NOMBRE_USUARIO,
    sortable: true,
  },
  {
    name: 'TIPO',
    selector: row => row.TIPO,
    sortable: true,
  },
  {
    name: 'AREA',
    selector: row => row.AREA,
    sortable: true,
  }
];

const ExpandedComponent = ({ data }) => (
  <div style={{ padding: '10px', backgroundColor: '#424242' }}>
    <p>AREA: {data.AREA}</p>
    <p>MARCA: {data.MARCA}</p>
    <p>MODELO: {data.MODELO}</p>
    <p>MAC: {data.MAC}</p>
    <p>SERIE: {data.NOMBRE_MOSTRAR}</p>
    <p>LDAP: {data.LDAP}</p>
    <p>FIRMWARE: {data.FIRMWARE}</p>
    <p>ESTATUS: {data.ESTATUS}</p>
    <p>PASSWORD_EXT: {data.PASSWORD_EXT}</p>
    <p>COMENTARIOS: {data.COMENTARIOS}</p>
  </div>
);

const headers = [
  { label: 'NOMBRE_MOSTRAR', key: 'NOMBRE_MOSTRAR' },
  { label: 'EXTENSION', key: 'EXTENSION' },
  { label: 'ASIGNADO', key: 'ASIGNADO' },
  { label: 'WORK_EXT', key: 'WORK_EXT' },
  { label: 'IP', key: 'IP' },
  { label: 'UID_LDAP', key: 'UID_LDAP' },
  { label: 'NOMBRE_USUARIO', key: 'NOMBRE_USUARIO' },
  { label: 'TIPO', key: 'TIPO' },
  { label: 'AREA', key: 'AREA' },
  { label: 'MARCA', key: 'MARCA' },
  { label: 'MODELO', key: 'MODELO' },
  { label: 'MAC', key: 'MAC' },
  { label: 'SERIE', key: 'SERIE' },
  { label: 'LDAP', key: 'LDAP' },
  { label: 'FIRMWARE', key: 'FIRMWARE' },
  { label: 'ESTATUS', key: 'ESTATUS' },
  { label: 'PASSWORD_EXT', key: 'PASSWORD_EXT' },
  { label: 'COMENTARIOS', key: 'COMENTARIOS' }
];

const paginationOptions = {
  rowsPerPageText: 'Filas por página:',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};


export const AdminPhoneExtensions = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
  const [open, setOpen] = useState(true);

  const [openModal, setOpenModal] = useState(false);



  useEffect(() => {
    const getExt = async () => {
      try {
        const url = "https://localhost:4000/getPhoneExtensions";
        const rspta = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setData(rspta.data);
        setLoading(false);
        setOpen(false)
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getExt();
  }, []);

  const filteredData = searchText.length === 0 ? data : data.filter(item =>
    item.NOMBRE_MOSTRAR.toLowerCase().includes(searchText.toLowerCase()) ||
    item.EXTENSION.toLowerCase().includes(searchText.toLowerCase()) ||
    item.ASIGNADO.toLowerCase().includes(searchText.toLowerCase()) ||
    item.WORK_EXT.toLowerCase().includes(searchText.toLowerCase()) ||
    item.IP.toLowerCase().includes(searchText.toLowerCase()) ||
    item.UID_LDAP.toLowerCase().includes(searchText.toLowerCase()) ||
    item.NOMBRE_USUARIO.toLowerCase().includes(searchText.toLowerCase()) ||
    item.TIPO.toLowerCase().includes(searchText.toLowerCase()) ||
    item.AREA.toLowerCase().includes(searchText.toLowerCase())
  );

  const handlePhone = () => {
    setOpenModal(true);

    return <> 

    </>



  }
  const handleCloseModal = () => setOpenModal(false);


  return (
    <>

    <NewPhoneExt open={openModal} handleClose={handleCloseModal} data={headers}/>

      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box component="section" sx={{ p: 2, width: "100%" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={2}>
            <Button
              variant="outlined"
              color="success"
              onClick={handlePhone}
            >Nueva extension
            </Button>
          </Grid>
          <Grid item xs={2}>
            <CSVLink
              data={data}
              headers={headers}
              filename="extensiones.csv"
              // className="btn btn-primary"
              target="_blank"
            >
              <Button
                variant="outlined"
                color="info"
              >Exportar CSV</Button>
            </CSVLink>
          </Grid>
          <Grid item xs={2}>

          </Grid>

          <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <TextField label="Buscar" variant="outlined" value={searchText}
              onChange={(e) => setSearchText(e.target.value)} />
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



