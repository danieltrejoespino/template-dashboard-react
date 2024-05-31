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
    // { headerName: "HASTA_CORTE", field: "HASTA_CORTE",valueFormatter: p => '$ ' + p.value.toLocaleString() },
    // { headerName: "AHORRO_S_Q", field: "AHORRO_S_Q", valueFormatter: p => '$ ' + p.value.toLocaleString() },
    // { headerName: "AHORRO_TOTAL", field: "AHORRO_TOTAL",valueFormatter: p => '$ ' + p.value.toLocaleString() },
    // { headerName: "FOTO", field: "USUARIO_ID", valueGetter: params => params.data.USUARIO_ID },
    // { field: "make", filter: true },
    // { field: "AHORRO_TOTAL", filter: true, floatingFilter: true },
  ];
  const pagination = true;
  const paginationPageSize = 500;
  const paginationPageSizeSelector = [200, 500, 1000];

  useEffect(() => {

    const fetchData = async () => {
      setLoading(true)
      const params = {
        query: ` SELECT * FROM DUAL `,
        campaign: "0",
      }
      try {
        const response = await axios.post('https://172.20.2.57:3009/api-serv/testOraQuery',params, {
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

    // fetchData(); esto se comenta por que no tengo acceso a la data
    
    setRowData(dataFalse.cajaAhorro)

  }, []);
  // if (loading) return <div>Cargando...</div>;  esto se comenta por que no tengo acceso a la data
  // if (error) return <div>Error: {error.message}</div>;   esto se comenta por que no tengo acceso a la data
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
      <ChartCajaAhorro data={rowData} />
    </>
  );
};

// export default AssistanceReport;
