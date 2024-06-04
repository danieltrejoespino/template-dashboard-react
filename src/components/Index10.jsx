import { Header } from "./Header";
import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
import {ImageRender} from './ImageRender'
import Page404 from './Page404'
import ProgressSpinner from './ProgressSpinner'
 


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

