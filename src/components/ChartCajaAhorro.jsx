import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ChartCajaAhorro = ({ data }) => {
  
  const sortedData = data.sort((a, b) => b.AHORRO_TOTAL - a.AHORRO_TOTAL);
  const top5Data = sortedData.slice(0, 10);

  // const categories = top5Data.map(item => item.NOMBRE);
  const seriesData = top5Data.map(item => item.AHORRO_TOTAL);

  const formatLabel = function() {
    const index = this.pos; // Índice de la etiqueta actual
    const user = top5Data[index]; // Datos del usuario correspondiente a esta etiqueta
    return ` <p>${user.NOMBRE} - ${index+1}</p>
    `;
  };
  const formatTooltip = function() {
    return `<b>${this.series.name}</b><br/>${this.x}: ${this.y}<br/>${this.point.category}`;
  };


  const options = {
    chart: {
      type: 'column' // Especifica el tipo de gráfico como 'column'
    },
    title: {
      text: 'Top 10'
    },
    xAxis: {
      labels: {
        rotation: -90,
        align: 'right',
        formatter: formatLabel // Utiliza la función formatLabel para formatear las etiquetas del eje X
      }
    },
    yAxis: {
      title: {
        text: 'Ahorro'
      }
    },
    plotOptions: {
      column: {
        stacking: 'normal',
        dataLabels: {
          enabled: true,
          formatter: function() {
            return `$${this.y}`;
          }
        }
      }
    },
    // tooltip: {
    //   formatter: formatTooltip
    // },
    series: [{
      name: 'Top ahorro',
      data: seriesData // Datos del gráfico
    }],
    
  };
  return (
    <>
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    </>
  );
};

export default ChartCajaAhorro;
