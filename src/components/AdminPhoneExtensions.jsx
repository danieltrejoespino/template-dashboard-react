import { useState, useEffect, useRef, useContext } from "react";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { UserContext } from '../context/UserContext';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

import { toast } from "react-toastify";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const AdminPhoneExtensions = () => {
  const [phoneExt, setPhoneExt] = useState([]);
  const [showExt, setShowExt] = useState(false);
  const [formValues, setFormValues] = useState({
    owner: "",
    area: "",
    ext: "",
  });

  const dmButton = (props) => {
    return (
      <>
        <IconButton
          color="error"
          aria-label="delete"
          onClick={() => handleDelete(props.value)}
        >
          <DeleteForeverIcon sx={{ fontSize: 30 }} />
        </IconButton>
      </>
    );
  };


  const initialColumnDefs = [
    {
      headerName: "NOMBRE_MOSTRAR",
      field: "NOMBRE_MOSTRAR",
      flex: 1,

    },
    {
      headerName: "EXTENSION",
      field: "EXTENSION",
      flex: 1,

    },
    {
      headerName: "ASIGNADO",
      field: "ASIGNADO",
      flex: 1,

    },
    {
      headerName: "WORK_EXT",
      field: "WORK_EXT",
      flex: 1,

    },
    {
      headerName: "IP",
      field: "IP",
      flex: 1,

    },
    {
      headerName: "UID_LDAP",
      field: "UID_LDAP",
      flex: 1,

    },
    {
      headerName: "NOMBRE_USUARIO",
      field: "NOMBRE_USUARIO",
      flex: 1,

    },
    {
      headerName: "TIPO",
      field: "TIPO",
      flex: 1,

    },
    {
      headerName: "AREA",
      field: "AREA",
      flex: 1,

    },
    {
      headerName: "MARCA",
      field: "MARCA",
      flex: 1,

    },
    {
      headerName: "MODELO",
      field: "MODELO",
      flex: 1,

    },
    {
      headerName: "MAC",
      field: "MAC",
      flex: 1,

    },
    {
      headerName: "SERIE",
      field: "SERIE",
      flex: 1,

    },
    {
      headerName: "LDAP",
      field: "LDAP",
      flex: 1,

    },
    {
      headerName: "FIRMWARE",
      field: "FIRMWARE",
      flex: 1,

    },
    {
      headerName: "ESTATUS",
      field: "ESTATUS",
      flex: 1,

    },
    {
      headerName: "PASSWORD_EXT",
      field: "PASSWORD_EXT",
      flex: 1,

    },
    {
      headerName: "COMENTARIOS",
      field: "COMENTARIOS",
      flex: 1,

    },





    // { headerName: "Acciones", field: "ID_EXT", cellRenderer: dmButton }
  ];



  const [refreshData, setRefreshData] = useState(false);

  const [quickFilterText, setQuickFilterText] = useState("");
  const gridRef = useRef(null);
  const { user } = useContext(UserContext);

  const [columnDefs, setColumnDefs] = useState([...initialColumnDefs]);





  // useEffect(() => {
  //   // Verifica el perfil del usuario y agrega la columna 'Acciones' si es necesario
  //   if (user.profile === '1') {
  //     const accionColumna = { headerName: "Acciones", field: "ID_EXT", cellRenderer: dmButton };
  //     setColumnDefs(prevDefs => [...prevDefs, accionColumna]);
  //   }else {
  //     // const accionColumna = { headerName: "Acciones", field: "ID_EXT", cellRenderer: dmButton };
  //     // setColumnDefs(prevDefs => [...prevDefs, accionColumna]);
  //   }
  // }, [user.profile]); 

  useEffect(() => {

    const getExt = async () => {
      try {
        const url = "https://localhost:4000/getPhoneExtensions";
        const rspta = await axios.get(url, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPhoneExt(rspta.data);
      } catch (error) {
        console.log(error);
      }
    };
    getExt();
  }, [refreshData]);

  const handleOpenNewExt = () => {
    setShowExt((prevShowFields) => !prevShowFields);
    // setShowExt(true)
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const addExt = async () => {
      try {
        const url = "https://localhost:4000/addPhoneExt";
        const rspta = await axios.post(url, formValues, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (rspta.data.rspta == "success") {
          setShowExt(false);
          setFormValues({
            owner: "",
            area: "",
            ext: "",
          });
          setRefreshData((prev) => !prev);
          toast.success("Extension guardada exitosamente!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    addExt();
  };

  const handleDelete = (value) => {
    const deleteExt = async () => {
      try {
        const params = {
          idExt: value,
        };
        const url = "https://localhost:4000/deletePhoneExtensions";
        const rspta = await axios.delete(url, {
          headers: {
            "Content-Type": "application/json",
          },
          data: params,
        });

        if (rspta.data.rspta == "success") {
          toast.success("Extension eliminada con exito!");
          setRefreshData((prev) => !prev);
        } else {
          toast.error("Error al eliminar la extension!");
        }
      } catch (error) {
        console.log(error);
      }
    };

    deleteExt();
  };

  const handleQuickFilterChange = (event) => {
    setQuickFilterText(event.target.value);
  };

  return (
    <>
      <Box component="section" sx={{ p: 2, width: "100%" }}>
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
                <Grid xs={3}>
                  <TextField
                    name="owner"
                    value={formValues.owner}
                    onChange={handleInputChange}
                    label="Propietario"
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid xs={3}>
                  <TextField
                    name="area"
                    value={formValues.area}
                    onChange={handleInputChange}
                    label="Area"
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid xs={3}>
                  <TextField
                    name="ext"
                    value={formValues.ext}
                    onChange={handleInputChange}
                    label="Extension"
                    variant="standard"
                    fullWidth
                  />
                </Grid>
                <Grid xs={3}>
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

            <Grid xs={4}></Grid>
          </Grid>
        </Grid>
      </Box>

      <Box component="section" sx={{ p: 2, width: "100%" }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <TextField
              sx={{ mb: 2, width: "20%" }}
              type="text"
              value={quickFilterText}
              onChange={handleQuickFilterChange}
              label="Filtro rapido"
              variant="outlined"
            />

            <div
              className={"ag-theme-quartz-dark"}
              style={{ width: "100%", height: "100%" }}
            >
              <AgGridReact
                ref={gridRef}
                rowData={phoneExt}
                columnDefs={columnDefs}
                pagination={true}
                paginationPageSize={20}
                domLayout="autoHeight"
                quickFilterText={quickFilterText}
              />
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};