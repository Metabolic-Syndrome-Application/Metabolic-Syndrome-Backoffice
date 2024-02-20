"use client"
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import * as React from 'react';
interface ITableProps {
  rows: any[];
  columns: any[];
  loading: any;
}

const tableStyles = {
  boxShadow:
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.05)',
  borderRadius: '16px',
  padding: '12px',
  //row height
  '&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell': { py: '8px' },
  '&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell': { py: '15px' },
  '&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell': { py: '22px' },
  //scrollbar
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

  const [loading, setLoading] = React.useState(false);

  return (
    <div className='flex w-full items-center justify-center px-1 py-4 md:px-2 lg:max-w-[1180px] xl:max-w-full'>
      <div className='bg-white h-[600px] min-w-full max-w-[450px] sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px] xl:max-w-full'>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          getRowHeight={() => 'auto'}
          getEstimatedRowHeight={() => 100}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
            },
          }}
          initialState={{
            // ...data.initialState,
            pagination: { paginationModel: { pageSize: 10 } },
          }}
          pageSizeOptions={[10, 25, 50]}
          sx={tableStyles}
        // onRowExpandToggle={handleRowExpandToggle}
        // {...({ expandedRowIds } as any)} // Explicitly cast to 
        />

      </div>
    </div>
  );
};

export default BaseTable;
