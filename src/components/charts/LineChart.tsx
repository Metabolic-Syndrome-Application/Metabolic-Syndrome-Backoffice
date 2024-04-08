/* eslint-disable react-hooks/exhaustive-deps */
//Line Chart
'use client';

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import Image from 'next/image';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { subDays, subMonths, subWeeks } from 'date-fns';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import useAxiosAuth from '@/hooks/useAxiosAuth';

type Props = {
  patientId: string;
  nameType: string;
  graphType: any;
};

const LineChart = ({ patientId, nameType, graphType }: Props) => {
  const axiosAuth = useAxiosAuth();
  const [graphData, setGraphData] = useState<any[] | null>(null);

  const [filter, setFilter] = useState('1day');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosAuth.get(
          `/api/record/health/patient/${patientId}/${graphType}`
        );
        setGraphData(response.data.data.record);
      } catch (error) {
        console.error('Error fetching graph data:', error);
      }
    };

    fetchData();
  }, [patientId, graphType]);
  const filterData = (data: any[]) => {
    const currentDate = new Date();
    let filteredData = [];

    switch (filter) {
      case '1day':
        filteredData = data.filter(
          (record) => new Date(record.timestamp) > subDays(currentDate, 1)
        );
        break;
      case '1week':
        filteredData = data.filter(
          (record) => new Date(record.timestamp) > subWeeks(currentDate, 1)
        );
        break;
      case '1month':
        filteredData = data.filter(
          (record) => new Date(record.timestamp) > subMonths(currentDate, 1)
        );
        break;
      case '3months':
        filteredData = data.filter(
          (record) => new Date(record.timestamp) > subMonths(currentDate, 3)
        );
        break;
      case '6months':
        filteredData = data.filter(
          (record) => new Date(record.timestamp) > subMonths(currentDate, 6)
        );
        break;
      default:
        filteredData = data;
    }

    // If no records found for the selected time period, return the latest record
    if (filteredData.length === 0 && data.length > 0) {
      filteredData = [data[0]];
    }

    return filteredData;
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

  return (
    <div className='shadow-light-shadow border-light-gray flex h-full max-h-[400px] w-full flex-col items-center justify-center rounded-lg border p-4'>
      {graphData && (
        <div className='flex w-full items-center justify-between px-4'>
          <h5 className='w-full text-start font-medium md:text-lg'>
            กราฟ{nameType}
          </h5>
          <div>
            <select
              value={filter} // Set the selected filter value
              onChange={(e) => setFilter(e.target.value)} // Handle filter change
              className='border-light-gray focus:ring-light-blue mr-3 flex min-w-[60px] gap-2 rounded-lg border px-3 py-2 shadow-sm outline-none focus:ring-2 sm:text-sm md:min-w-[120px]'
            >
              <option value='1day'>1 วัน</option>
              <option value='1week'>1 อาทิตย์</option>
              <option value='1month'>1 เดือน</option>
              <option value='3months'>3 เดือน</option>
              <option value='6months'>6 เดือน</option>
            </select>
          </div>
        </div>
      )}
      <div className='flex h-full w-full max-w-[500px] items-center justify-center'>
        {graphData && graphData.length > 0 ? (
          <Line data={transformData(graphData)} />
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <Image
              src='/assets/images/noData.svg'
              alt='noData'
              className='h-56 w-56'
              width={350}
              height={350}
              priority={false}
            />
            <p className='text-default-red'>
              ยังไม่มีผลกราฟสุขภาพของคนไข้ในตอนนี้
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineChart;
