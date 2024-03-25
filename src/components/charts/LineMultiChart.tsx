/* eslint-disable @next/next/no-img-element */
import { subDays, subMonths, subWeeks } from 'date-fns';
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

const LineMultiChart = ({
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
    switch (filter) {
      case '1day':
        return data.filter(
          (record) => new Date(record.timestamp) > subDays(currentDate, 1)
        );
      case '1week':
        return data.filter(
          (record) => new Date(record.timestamp) > subWeeks(currentDate, 1)
        );
      case '1month':
        return data.filter(
          (record) => new Date(record.timestamp) > subMonths(currentDate, 1)
        );
      case '3months':
        return data.filter(
          (record) => new Date(record.timestamp) > subMonths(currentDate, 3)
        );
      case '6months':
        return data.filter(
          (record) => new Date(record.timestamp) > subMonths(currentDate, 6)
        );
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

  return (
    <div className='shadow-light-shadow border-light-gray flex h-full  max-h-[400px] w-full flex-col items-center justify-center rounded-lg border p-4'>
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
            <img
              src='/assets/images/noData.svg'
              alt='noData'
              className='h-56 w-56'
            />
            <p className='text-default-red'>
              ตอนนี้ยังไม่มีผลกราฟสุขภาพของคนไข้
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LineMultiChart;
