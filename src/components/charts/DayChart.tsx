import { subDays } from 'date-fns';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import useAxiosAuth from '@/hooks/useAxiosAuth';

type Props = {
  patientId: string;
  graphType: any;
};

const DayChart = ({ patientId, graphType }: Props) => {
  const axiosAuth = useAxiosAuth();
  const [graphData, setGraphData] = useState<any[]>([]); // Initialize graphData as an empty array
  const [filter, setFilter] = useState('1day');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAuth.get(`/api/record/health/patient/${patientId}/${graphType}`);
        setGraphData(response.data.data.record);
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    fetchData();
  }, [axiosAuth, patientId, graphType]);

  const filterData = (data: any[]) => {
    const currentDate = new Date();
    return data.filter((record) => new Date(record.timestamp) > subDays(currentDate, 1));
  };

  const transformData = (data: any[]) => {
    const filteredData = filterData(data);
    const labels = filteredData.map((record) => record.timestamp);
    const systolicPressure = filteredData.map((record) => record.systolicBloodPressure);
    const diastolicPressure = filteredData.map((record) => record.diastolicBloodPressure);
    const pulseRate = filteredData.map((record) => record.pulseRate);

    return {
      labels: labels,
      datasets: [
        {
          label: 'Systolic Pressure',
          data: systolicPressure,
          borderColor: 'rgb(251, 98, 98)',
          borderWidth: 3,
          fill: false,
        },
        {
          label: 'Diastolic Pressure',
          data: diastolicPressure,
          borderColor: 'rgb(5, 2, 241)',
          borderWidth: 3,
          fill: false,
        },
        {
          label: 'Pulse Rate',
          data: pulseRate,
          borderColor: 'rgb(66, 132, 75)',
          borderWidth: 3,
          fill: false,
        },
      ],
    };
  };

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-10">Blood Pressure Chart</h1>
      {graphData.length && (
        <div style={{ width: '900px', height: '400px', padding: '20px' }}>
          <Line data={transformData(graphData)} />
        </div>
      )}
    </div>
  );
};

export default DayChart;
