import { Header } from "./Header";
import axios from "axios";
import React, { useEffect, useState } from "react";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

export const CajaAhorro = () => {
  // const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    { headerName: "TOP", field: "TOP" },
    { headerName: "USUARIO_ID", field: "USUARIO_ID" },
    { headerName: "NOMBRE", field: "NOMBRE" },
    { headerName: "HASTA_CORTE", field: "HASTA_CORTE",valueFormatter: p => '$ ' + p.value.toLocaleString() },
    { headerName: "AHORRO_S_Q", field: "AHORRO_S_Q", valueFormatter: p => '$ ' + p.value.toLocaleString() },
    { headerName: "AHORRO_TOTAL", field: "AHORRO_TOTAL",filter: true,floatingFilter: true },
    // { field: "make", filter: true },
    // { field: "AHORRO_TOTAL", filter: true, floatingFilter: true },
  ];
  const pagination = true;
  const paginationPageSize = 500;
  const paginationPageSizeSelector = [200, 500, 1000];

  useEffect(() => {
    const params = {
      query: `SELECT 1 AS TOP, 577242 USUARIO_ID, 'S' NOMBRE, '77' HASTA_CORTE, '88' AHORRO_S_Q, '11' AHORRO_TOTAL FROM DUAL    `,
      campaign: "0",
    };
    axios
      .post("https://172.20.2.57:3009/api-serv/testOraQuery", params, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Manejar la respuesta exitosa
        console.log(response.data);
        // setData(response.data);
        setRowData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        // Manejar los errores
        setError(error);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log("ddd");
  return (
    <>
      <Header />

      <div
        className="ag-theme-quartz" // applying the grid theme
        style={{ height: 800 }} // the grid will fill the size of the parent container
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

// export default AssistanceReport;
