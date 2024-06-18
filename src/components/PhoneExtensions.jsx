import { useState, useEffect } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import { toast } from 'react-toastify';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

// const dmButton = (props) => {
//   console.log(props.value);

//   return <>
//     <IconButton
//     color="error"
//     aria-label="delete"
//     // onClick={handleSubmit}
//   >
//     <DeleteForeverIcon sx={{ fontSize: 30 }} />
//   </IconButton>
//   </>

// }



export const PhoneExtensions = () => {
  const [phoneExt, setPhoneExt] = useState([]);
  const [showExt, setShowExt] = useState(false);
  const [formValues, setFormValues] = useState({
    owner: '',
    area: '',
    ext: ''
  });
  const [refreshData, setRefreshData] = useState(false);


  const columnDefs = [
    { headerName: "Propietario", field: "OWNER_EXT", flex: 1, filter: true, floatingFilter: true, },
    { headerName: "Area", field: "AREA_EXT", flex: 1, filter: true, floatingFilter: true, },
    { headerName: "Extension", field: "NAME_EXT", flex: 1, filter: true, floatingFilter: true, },
    // { headerName: "Acciones", field: "ID_EXT", cellRenderer: dmButton }

  ];

  useEffect(() => {
    const getExt = async () => {
      try {
        const url = 'https://172.20.2.57:4000/getPhoneExtensions';
        const rspta = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPhoneExt(rspta.data);
      } catch (error) {
        console.log(error);
      }
    }
    getExt();
  }, [refreshData]);

  const handleOpenNewExt = () => {
    setShowExt(prevShowFields => !prevShowFields);
    // setShowExt(true)
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const handleSubmit = () => {
     const addExt = async () => {
      try {
        const url = 'https://172.20.2.57:4000/addPhoneExt';
        const rspta = await axios.post(url,formValues, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(rspta.data.rspta);
        //!Falta mostrar alerta cuando se agrego con exito
        if ( rspta.data.rspta == 'success') {
          setShowExt(false)
          setFormValues({
            owner: '',
            area: '',
            ext: ''
          });
          setRefreshData(prev => !prev);
        
          toast.success("Extension guardada exitosamente!");
          
        }  
        



      } catch (error) {
        console.log(error);
      }
    }
    addExt();    
  };

  


  return (
    <>
      <Box component="section" sx={{ p: 2, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid xs={4}>
            <IconButton
              color="success"
              aria-label="add"
              onClick={handleOpenNewExt}
            >
              <AddCircleIcon sx={{ fontSize: 30 }} /> Nueva extension
            </IconButton>
          </Grid>
          <Grid container xs={4}>

            {showExt && (
                <Grid container spacing={2}>

                  <Grid  xs={3}>
                    <TextField
                      name="owner"
                      value={formValues.owner}
                      onChange={handleInputChange}
                      label="Propietario"
                      variant="standard"
                      fullWidth
                    />
                  </Grid>
                  <Grid  xs={3}>
                    <TextField
                      name="area"
                      value={formValues.area}
                      onChange={handleInputChange}
                      label="Area"
                      variant="standard"
                      fullWidth />
                  </Grid>
                  <Grid  xs={3}>
                    <TextField
                      name="ext"
                      value={formValues.ext}
                      onChange={handleInputChange}
                      label="Extension"
                      variant="standard"
                      fullWidth />
                  </Grid>
                  <Grid  xs={3}>
                    <IconButton
                      type="submit"
                      color="success"
                      aria-label="add"
                      onClick={handleSubmit}
                    >
                      Enviar
                      <SendIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </Grid>
                </Grid>

            )}

            <Grid xs={4}>
            </Grid>

          </Grid>
        </Grid>
      </Box>

      <Box component="section" sx={{ p: 2, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <div
              className={"ag-theme-quartz-dark"}
              style={{ width: "100%", height: "100%" }}
            >
              <AgGridReact
                rowData={phoneExt}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={20}
                domLayout="autoHeight"
                rowSelection="single"
              />
            </div>
          </Grid>
        </Grid>
      </Box>

    </>
  )

}


