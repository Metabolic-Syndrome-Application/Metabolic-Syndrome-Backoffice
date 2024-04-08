/* eslint-disable @next/next/no-img-element */
//Line Chart custom color
import { subDays, subMonths, subWeeks } from 'date-fns';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';

import useAxiosAuth from '@/hooks/useAxiosAuth';

type Props = {
  patientId: string;
  graphType: any;
  labels: string[];
  dataKeys: string[];
  nameType: string;
};

const LineChartPressure = ({
  patientId,
  graphType,
  labels,
  dataKeys,
  nameType,
}: Props) => {
  const axiosAuth = useAxiosAuth();
  const [graphData, setGraphData] = useState<any[]>([]);
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
  }, [axiosAuth, patientId, graphType]);

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

  const transformData = (data: any[]) => {
    const filteredData = filterData(data);
    const colors = ['rgb(251, 98, 98)', 'rgb(5, 2, 241)', 'rgb(66, 132, 75)'];

    return {
      labels: filteredData.map((record) => record.timestamp),
      datasets: labels.map((label, index) => ({
        label: label,
        data: filteredData.map((record) => record[dataKeys[index]]),
        borderColor: colors[index % colors.length], // Use modulo to cycle through colors array
        borderWidth: 3,
        fill: false,
      })),
    };
  };

  return (
    <div className='shadow-light-shadow border-light-gray flex h-full w-full flex-col items-center justify-center rounded-lg border p-4 lg:max-h-[400px]'>
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
      <div className='flex h-full w-full items-center justify-center lg:max-w-[500px]'>
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

export default LineChartPressure;
