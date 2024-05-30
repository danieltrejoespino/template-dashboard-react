import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

// export default AssistanceReport;
