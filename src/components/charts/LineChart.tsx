"use client"
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

import { subDays, subMonths, subQuarters, subWeeks } from 'date-fns';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import useAxiosAuth from '@/hooks/useAxiosAuth';
type Props = {
  patientId: string;
  graphType: any
}

const LineChart = ({ patientId, graphType }: Props) => {
  const axiosAuth = useAxiosAuth();
  // const [graphData, setGraphData] = useState(null);
  const [graphData, setGraphData] = useState<any[] | null>(null);

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
  }, [patientId, graphType]);

  const filterData = (data: any[]) => {
    const currentDate = new Date();
    switch (filter) {
      case '1day':
        return data.filter((record) => isWithinRange(new Date(record.timestamp), subDays(currentDate, 1), currentDate));
      case '1week':
        return data.filter((record) => isWithinRange(new Date(record.timestamp), subWeeks(currentDate, 7), currentDate));
      case '1month':
        return data.filter((record) => isWithinRange(new Date(record.timestamp), subMonths(currentDate, 1), currentDate));
      case '3months':
        return data.filter((record) => isWithinRange(new Date(record.timestamp), subQuarters(currentDate, 1), currentDate));
      default:
        return data;
    }
  };

  const isWithinRange = (date: number | Date, startDate: number | Date, endDate: number | Date) => {
    return startDate <= date && date <= endDate;
  };


  const transformData = (data: any) => {
    const filteredData = filterData(data);
    return {
      labels: filteredData.map((record) => record.timestamp),
      datasets: [
        {
          label: graphType.toUpperCase(),
          data: filteredData.map((record) => record[graphType]),
          borderColor: 'rgb(5, 2, 241)',
          borderWidth: 3,
          pointBorderColor: '#cb0c9f',
          pointBorderWidth: 3,
          tension: 0.5,
          // fill: true,
          //backgroundColor: 'rgba(247, 151, 225, 0.5)', // Example gradient
        },
      ],
    };
  };

  const handleFilterChange = (value: React.SetStateAction<string>) => {
    setFilter(value);
  };

  return (
    <div className='flex flex-col bg-red-400'>
      <h1 className="font-bold text-3xl text-center mt-10">
        Line Chart using ChartJS
      </h1>

      {/* Render the select element only if graphData is available */}
      {graphData && (
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
      )}
      <div className='flex  bg-blue-500'>
        {graphData && graphData.length > 0 ? (
          <Line data={transformData(graphData)} />
        ) : (
          <p>No data available</p>
        )}
      </div>

    </div>
  );
};

export default LineChart;