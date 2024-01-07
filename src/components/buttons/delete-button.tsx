import { Dialog } from '@mui/material';
import React, {useState } from 'react';

//use in file dataEdit
const DeleteButton = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    handleClose();
  };

  return (
    <div>
      <button type='button' onClick={handleClickOpen}>
        del
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <div className='w-[32rem] p-8'>
          <h1 className='mb-4 text-xl font-bold'>Delete</h1>
          <h4 className='mb-8 text-slate-600'>
            คุณต้องการที่จะลบไฟล์นี้หรือไม่
          </h4>
          <div className='flex justify-end gap-4'>
            <button
              type='button'
              onClick={handleDelete}
              className='cursor-pointer rounded-lg bg-[#FB8500] px-4 py-2 text-sm font-bold text-white hover:bg-[#F28204] md:text-base'
            >
              ลบ
            </button>
            <button
              type='button'
              onClick={handleClose}
              className='cursor-pointer rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-[#999999] hover:bg-slate-200 md:text-base'
            >
              ยกเลิก
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteButton;
