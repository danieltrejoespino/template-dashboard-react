import "../App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import ChartCajaAhorro from "./ChartCajaAhorro";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { toast } from "react-toastify";
import { Typography, Box } from "@mui/material";

import { ImageRender } from "./ImageRender";
import Page404 from "./Page404";
import ProgressSpinner from "./ProgressSpinner";

export const CajaAhorro = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    { headerName: "TOP", field: "TOP", flex: 1 },
    {
      headerName: "USUARIO_ID",
      field: "USUARIO_ID",
      flex: 1,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "NOMBRE",
      field: "NOMBRE",
      flex: 2,
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: "HASTA_CORTE",
      field: "HASTA_CORTE",
      flex: 1,
      valueFormatter: (p) => (p.value ? "$ " + p.value.toLocaleString() : ""),
    },
    {
      headerName: "AHORRO_S_Q",
      field: "AHORRO_S_Q",
      flex: 1,
      valueFormatter: (p) => (p.value ? "$ " + p.value.toLocaleString() : ""),
    },
    {
      headerName: "AHORRO_TOTAL",
      field: "AHORRO_TOTAL",
      flex: 1,
      valueFormatter: (p) => (p.value ? "$ " + p.value.toLocaleString() : ""),
    },
    {
      headerName: "FOTO",
      field: "USUARIO_ID",
      cellRenderer: ImageRender,
    },
  ];

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        toast.success("Nomina copiada al portapapeles!");
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles: ", err);
        toast.success("Error al copiar al portapapeles!");
      });
  };

  const gridOptions = {
    rowData: rowData,
    columnDefs: columnDefs,
    pagination: true,
    paginationPageSize: 10,
    paginationPageSizeSelector: [10, 20, 100, 500, 1000],
    domLayout: "autoHeight",
    rowSelection: "single",
    onSelectionChanged: function (event) {
      const selectedRow = event.api.getSelectedRows()[0]; // Obtiene la fila seleccionada
      if (selectedRow) {
        const nomina = selectedRow.USUARIO_ID; // Obtiene el valor del campo 'name'
        // console.log(nomina); // Muestra el valor del campo 'name' en la consola
        copyToClipboard(nomina);
      }
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const params = {
        query: ` 
        WITH 
        c1 AS (
            SELECT
                usuario_id,
                cantidad
            FROM asistencia.caja_ahorros
            WHERE concepto LIKE '%Ahorro al%' ),
            
        fechas_actuales AS ( 
            SELECT MAX(fecha2) AS fecha, substr(concepto, 1, 8) AS concepto
            FROM asistencia.caja_ahorros
            WHERE ( concepto LIKE '%Ahorro Q%' OR concepto LIKE '%Ahorro S%' )
            GROUP BY substr(concepto, 1, 8) ), 
        c2 AS (
                SELECT
            r.usuario_id,
            r.cantidad,
            ROW_NUMBER()
            OVER(PARTITION BY usuario_id
            ORDER BY
            fecha2 DESC
            ) AS rn
            FROM
            asistencia.caja_ahorros r
            JOIN fechas_actuales fa ON fa.concepto = substr(r.concepto, 1, 8)
            AND fa.fecha = r.fecha2
            WHERE
            r.concepto LIKE '%Ahorro Q%'
            OR r.concepto LIKE '%Ahorro S%'
            ), c3 AS (
            SELECT
            usuario_id,
            SUM(cantidad) AS cantidad
            FROM
            asistencia.caja_ahorros c3
            GROUP BY
            usuario_id
            )
            SELECT
            ROW_NUMBER() OVER( ORDER BY c3.cantidad DESC) AS TOP,
            c3.USUARIO_ID,
            u.nombre
            || ' '
            || u.apellido_paterno
            || ' '
            || u.apellido_materno AS NOMBRE,
            c1.cantidad           AS HASTA_CORTE,
            nvl(c2.cantidad, 0)   AS AHORRO_S_Q,
            c3.cantidad           AHORRO_TOTAL
            FROM
            c3
            LEFT JOIN c2 ON c2.usuario_id = c3.usuario_id
            AND c2.rn = 1
            LEFT JOIN c1 ON c3.usuario_id = c1.usuario_id
            JOIN asistencia.usuarios u ON u.id_usuario = c3.usuario_id
            WHERE u.status_id = 1   
            GROUP BY
            c3.usuario_id, u.nombre  || ' '   || u.apellido_paterno || ' ' || u.apellido_materno, c1.cantidad,  c2.cantidad, c3.cantidad
            ORDER BY 6 DESC `,
        campaign: "0",
      };
      try {
        const response = await axios.post(
          "https://172.20.1.97:3009/api-serv/testOraQuery",
          params,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setRowData(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <ProgressSpinner />;
  if (error) return <Page404 message={error.message} />;
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography variant="h4" gutterBottom>
          Caja de ahorro
        </Typography>
      </Box>


      <div
        className={"ag-theme-quartz-dark"}
        style={{ width: "100%", height: "100%" }}
      >
        <AgGridReact gridOptions={gridOptions} />
      <ChartCajaAhorro data={rowData} />
      </div>
    </>
  );
};
