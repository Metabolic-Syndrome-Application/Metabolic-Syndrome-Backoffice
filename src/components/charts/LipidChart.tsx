import { subDays, subMonths, subWeeks } from 'date-fns';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import useAxiosAuth from '@/hooks/useAxiosAuth';

type Props = {
  patientId: string;
  graphType: any;
  labels: string[];
  dataKeys: string[];
};

const LipidChart = ({ patientId, graphType, labels, dataKeys }: Props) => {
  const axiosAuth = useAxiosAuth();
  const [graphData, setGraphData] = useState<any[]>([]);
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
    switch (filter) {
      case '1day':
        return data.filter((record) => new Date(record.timestamp) > subDays(currentDate, 1));
      case '1week':
        return data.filter((record) => new Date(record.timestamp) > subWeeks(currentDate, 1));
      case '1month':
        return data.filter((record) => new Date(record.timestamp) > subMonths(currentDate, 1));
      case '3months':
        return data.filter((record) => new Date(record.timestamp) > subMonths(currentDate, 3));
      case '6months':
        return data.filter((record) => new Date(record.timestamp) > subMonths(currentDate, 6));
      default:
        return data;
    }
  };

  const transformData = (data: any[]) => {
    const filteredData = filterData(data);

    return {
      labels: filteredData.map((record) => record.timestamp),
      datasets: labels.map((label, index) => ({
        label: label,
        data: filteredData.map((record) => record[dataKeys[index]]),
        borderColor: getRandomColor(),
        borderWidth: 3,
        fill: false,
      })),
    };
  };

  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // const handleFilterChange = (value: string) => {
  //   setFilter(value);
  // };
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1 className="font-bold text-3xl text-center mt-10">Lipid Chart</h1>
      <div className="flex justify-center mb-5">
        <select
          value={filter} // Set the selected filter value
          onChange={(e) => setFilter(e.target.value)} // Handle filter change
          className="mr-3 border border-light-gray flex min-w-[120px] gap-2 px-3 py-2 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-light-blue sm:text-sm"
        >
          <option value="1day">1 Day</option>
          <option value="1week">1 Week</option>
          <option value="1month">1 Month</option>
          <option value="3months">3 Months</option>
          <option value="6months">6 Months</option>
        </select>
      </div>
      {graphData && graphData.length > 0 && (
        <div style={{ width: '900px', height: '400px', padding: '20px' }}>
          <Line data={transformData(graphData)} />
        </div>
      )}
    </div>
  );
};

export default LipidChart;
