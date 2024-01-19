import { Dialog } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';

import { axiosAuth } from '@/lib/axios';

interface DeleteBtnProps {
  loadData: () => void;
  api: string;
}

const DeleteButton = ({ loadData, api }: DeleteBtnProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const handleClick = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  const handleDelete = async () => {
    try {
      setWaiting(true);
      await axiosAuth.delete(`${api}`);

      enqueueSnackbar('Delete Success', { variant: 'success' });
      loadData();
    } catch (error) {
      /* empty */
      enqueueSnackbar('Cannot Delete', { variant: 'error' });
    }
    setOpen(false);
    setWaiting(false);
  };

  return (
    <>
      <button type='button' onClick={handleClick(true)}>
        {/* <DeleteIcon className='hover:text-primary group cursor-pointer text-[#999999]' /> */}
        <MdDelete className='hover:text-primary group cursor-pointer text-[#999999]' />
      </button>

      <Dialog
        open={open}
        onClose={handleClick(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <div className='w-[32rem] p-8'>
          {waiting ? (
            <>Loading</>
          ) : (
            <>
              <h1 className='mb-4 text-xl font-bold'>Delete</h1>
              <h4 className='mb-8 text-slate-600'>
                Are you sure want to delete?
              </h4>
              <div className='flex justify-end gap-4'>
                <button
                  type='button'
                  onClick={handleDelete}
                  className='cursor-pointer rounded-lg bg-[#FB8500] px-4 py-2 text-sm font-bold text-white hover:bg-[#F28204] md:text-base'
                >
                  Delete
                </button>
                <button
                  type='button'
                  onClick={handleClick(false)}
                  className='cursor-pointer rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-[#999999] hover:bg-slate-200 md:text-base '
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </Dialog>
    </>
  );
};

export default DeleteButton;
