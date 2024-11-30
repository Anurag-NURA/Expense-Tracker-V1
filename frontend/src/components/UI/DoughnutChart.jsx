import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';

export const DoughnutChart = ({ data, labels }) => {
  return (
    <Doughnut
      data={{
        labels: labels,
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#C70039',
              '#fe9301'
            ],
            hoverBackgroundColor: [
              '#FF6384',
              '#36A2EB',
              '#FFCE56',
              '#4BC0C0',
              '#9966FF',
              '#C70039',
              '#fe9301'
            ],
          },
        ],
      }}
      options={{
        plugins: {
          title: {
            display: true,
            text: 'Expense Categories',
          },
          legend: {
            position: 'right',
          },
        },
      }}
    />
  );
};