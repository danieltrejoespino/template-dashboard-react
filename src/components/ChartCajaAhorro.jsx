import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ChartCajaAhorro = ({ data }) => {
  const options = {
    chart: {
      type: 'column'
    },
    title: {
      text: 'TOP CAJA DE AHORRO'
    },
    xAxis: {
      categories: data.map(d => d.NOMBRE),
      title: {
        text: 'Usuarios'
      }
    },
    yAxis: {
      min: 0,
      title: {
        text: 'Valores'
      },
      stackLabels: {
        enabled: true,
        style: {
          fontWeight: 'bold',
          color: (Highcharts.defaultOptions.title.style && Highcharts.defaultOptions.title.style.color) || 'gray'
        }
      }
    },
    legend: {
      align: 'right',
      x: -30,
      verticalAlign: 'top',
      y: 25,
      floating: true,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'white',
      borderColor: '#CCC',
      borderWidth: 1,
      shadow: false
    },
    tooltip: {
      headerFormat: '<b>{point.x}</b><br/>',
      pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true
        }
      }
    },
    series: [
      {
        name: 'Hasta Corte',
        data: data.map(d => parseInt(d.HASTA_CORTE, 10))
      },
      {
        name: 'Ahorro S Q',
        data: data.map(d => parseInt(d.AHORRO_S_Q, 10))
      },
      {
        name: 'Ahorro Total',
        data: data.map(d => parseInt(d.AHORRO_TOTAL, 10))
      }
    ]
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default ChartCajaAhorro;
