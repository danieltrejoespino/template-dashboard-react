import { Header } from "./Header";
import axios from "axios";
import { useEffect, useState } from "react";
import ChartCajaAhorro from "./ChartCajaAhorro";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
 
import dataFalse from '../../utilities/data'
export const CajaAhorro = () => {
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rowData, setRowData] = useState([]);

  const columnDefs = [
    { headerName: "TOP", field: "TOP" },
    { headerName: "USUARIO_ID", field: "USUARIO_ID",filter: true,floatingFilter: true  },
    { headerName: "NOMBRE", field: "NOMBRE",filter: true,floatingFilter: true  },
    { headerName: "HASTA_CORTE", field: "HASTA_CORTE", valueFormatter: p => p.value ? '$ ' + p.value.toLocaleString() : '' },
    { headerName: "AHORRO_S_Q", field: "AHORRO_S_Q", valueFormatter: p => p.value ? '$ ' + p.value.toLocaleString() : ''  },
    { headerName: "AHORRO_TOTAL", field: "AHORRO_TOTAL",valueFormatter: p => p.value ? '$ ' + p.value.toLocaleString() : ''  },
    // { headerName: "FOTO", field: "USUARIO_ID", valueGetter: params => params.data.USUARIO_ID },
    // { field: "make", filter: true },
    // { field: "AHORRO_TOTAL", filter: true, floatingFilter: true },
  ];
  const pagination = true;
  const paginationPageSize = 20;
  const paginationPageSizeSelector = [20,100,500, 1000];

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true)
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
      }
      try {
        const response = await axios.post('https://172.20.1.97:3009/api-serv/testOraQuery',params, {
                headers: {
                  "Content-Type": "application/json",
                },
          })
        setRowData(response.data)
      } catch (error) {
        console.log(error)
        setError(error);
      } finally {
        setLoading(false)
      }

    }

    fetchData();
  }, []);
  if (loading) return <div>Cargando...</div>;  
  if (error) return <div>Error: {error.message}</div>; 
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
      {/* <ChartCajaAhorro data={rowData} /> */}
    </>
  );
};

// export default AssistanceReport;
