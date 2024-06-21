import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import axios from 'axios';
import React, { useEffect, useState } from 'react';


const options = {
  title: {
    text: 'Top caja'
  },
  series: [
    {
      name: 'Ejemplo',
      data: [1, 2, 3, 4, 5]
    }
  ]
};

export const AssistanceReport = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    
    const params = {
      query: `SELECT 1 AS TOP, 577242 USUARIO_ID, 'S' NOMBRE, '77' HASTA_CORTE, '88' AHORRO_S_Q, '11' AHORRO_TOTAL FROM DUAL    `,
              campaign: '0'
    };
    axios.post('https://localhost:3009/api-serv/testOraQuery',params,{
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        // Manejar la respuesta exitosa
        console.log(response.data)
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        // Manejar los errores
        setError(error);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error.message}</div>;
  console.log('ddd')
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

// export default AssistanceReport;
