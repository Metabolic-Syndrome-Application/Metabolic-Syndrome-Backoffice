import { Dialog } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

import { axiosAuth } from '@/lib/axios';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '@/redux/slices/usersSlice';
import useModal from '@/hooks/useModal';
import FormHeaderText from '@/components/form/FormHeaderText';

interface DeleteBtnProps {
  loadData: () => void;
  api: string;
  role?: string;
  id?: string;
}

const DeleteButton = ({ loadData, api, role, id }: DeleteBtnProps) => {
  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const handleClick = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  const dispatch = useDispatch<any>();

  const handleDelete = async () => {
    try {
      setWaiting(true);
      await axiosAuth.delete(`${api}`);

      enqueueSnackbar('Delete Success', { variant: 'success' });
      loadData();
      //dispatch(fetchUsers());
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
        <MdDelete
          className='hover:text-primary group cursor-pointer text-[#999999]'
          onClick={openModal}
        />
      </button>

      <Modal>
        <div className='w-[300px] px-4 md:w-[512px]'>
          {waiting ? (
            <>Loading</>
          ) : (
            <>
              <FormHeaderText
                // icon={FaUserDoctor}
                title='การยืนยัน'
                useBigestHeader
              />
              <h5 className='mb-8 indent-2 text-slate-600'>
                คุณแต้องการที่จะ ลบ หรือ ไม่ ?
              </h5>
              <div className='flex justify-end gap-4 py-2'>
                <button
                  type='button'
                  onClick={handleDelete}
                  className='bg-default-red cursor-pointer rounded-lg px-4 py-2 text-sm font-bold text-white hover:bg-[#F28204] md:text-base'
                >
                  Delete
                </button>
                <button
                  type='button'
                  onClick={closeModal}
                  className='cursor-pointer rounded-lg bg-slate-100 px-4 py-2 text-sm font-bold text-[#999999] hover:bg-slate-200 md:text-base '
                >
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
