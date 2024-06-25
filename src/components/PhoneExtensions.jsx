import { useState, useEffect, useRef,useContext } from "react";
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

export const PhoneExtensions = () => {
  const [phoneExt, setPhoneExt] = useState([]);
  const [showExt, setShowExt] = useState(false);
  const [formValues, setFormValues] = useState({
    owner: "",
    area: "",
    ext: "",
  });

  const initialColumnDefs = [
    {
      headerName: "Propietario",
      field: "OWNER_EXT",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Area",
      field: "AREA_EXT",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "Extension",
      field: "NAME_EXT",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
  ];



  const [refreshData, setRefreshData] = useState(false);

  const [quickFilterText, setQuickFilterText] = useState("");
  const gridRef = useRef(null);
  const { user } = useContext(UserContext);

  const [columnDefs, setColumnDefs] = useState([...initialColumnDefs]);


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

  
  const handleQuickFilterChange = (event) => {
    setQuickFilterText(event.target.value);
  };

  return (
    <>
      <Box component="section" sx={{ p: 2, width: "100%" }}>
        <Grid container spacing={2}>
          <Grid xs={12}>
            <TextField
              sx={{ mb:2,  width: "20%" }}
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
