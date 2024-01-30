import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import { axiosAuth } from '@/lib/axios';
import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
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
          className='hover:text-primary hover:text-default-red focus:text-default-red active:text-default-red  group cursor-pointer  text-[#999999] focus:outline-none'
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
                <ActionButton
                  type='reset'
                  variant='cancel'
                  onClick={closeModal}
                >
                  ยกเลิก
                </ActionButton>
                <ActionButton
                  type='submit'
                  variant='delete'
                  onClick={handleDelete}
                >
                  ลบ
                </ActionButton>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default DeleteButton;
