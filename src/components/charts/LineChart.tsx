"use client"

import Image from 'next/image';
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
  nameType: string;
  graphType: any
}

const LineChart = ({ patientId, nameType, graphType }: Props) => {
  const axiosAuth = useAxiosAuth();
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
          borderRadius: 20,
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

  // const handleFilterChange = (value: React.SetStateAction<string>) => {
  //   setFilter(value);
  // };

  return (
    <div className='flex flex-col items-center justify-center max-h-[400px] w-full shadow-light-shadow border border-light-gray p-4 rounded-lg h-full'>
      {graphData && (
        <div className="flex items-center justify-between w-full px-4">
          <h5 className="font-medium md:text-xl text-start w-full">
            กราฟ{nameType}
          </h5>
          <div>
            <select
              value={filter} // Set the selected filter value
              onChange={(e) => setFilter(e.target.value)} // Handle filter change
              className="mr-3 border border-light-gray flex min-w-[60px] md:min-w-[120px] gap-2 px-3 py-2 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-light-blue sm:text-sm"
            >
              <option value="1day">1 วัน</option>
              <option value="1week">1 อาทิตย์</option>
              <option value="1month">1 เดือน</option>
              <option value="3months">3 เดือน</option>
              <option value="6months">6 เดือน</option>
            </select>
          </div>
        </div>
      )}
      <div className='flex w-full h-full items-center justify-center max-w-[500px]'>
        {graphData && graphData.length > 0 ? (
          <Line data={transformData(graphData)} />
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <Image
              src="/assets/images/noData.svg"
              alt="noData"
              className="w-56 h-56"
              width={350}
              height={350}
              priority={false}
            />
            <p className='text-default-red'>ตอนนี้ยังไม่มีผลกราฟสุขภาพของคนไข้</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default LineChart;