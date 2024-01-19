import { DataGrid } from '@mui/x-data-grid';

interface ITableProps {
  rows: any[];
  columns: any[];
}

const tableStyles = {
  boxShadow:
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
  borderRadius: '16px',
  padding: '12px',
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track': {
    background: '#f1f1f1',
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb': {
    background: '#D1D1D2',
    borderRadius: '16px',
  },
  '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb:hover': {
    background: '#555',
  },
};

const BaseTable = ({ rows, columns }: ITableProps) => {
  return (
    <div className='flex w-full items-center justify-center px-1 py-4 md:px-2 lg:max-w-[1180px] xl:max-w-full'>
      <div className='h-[600px] max-w-[450px] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] 2xl:min-w-fit'>
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight={false}
          rowHeight={56}
          initialState={{
            // ...data.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          sx={tableStyles}
        />
      </div>
    </div>
  );
};

export default BaseTable;
