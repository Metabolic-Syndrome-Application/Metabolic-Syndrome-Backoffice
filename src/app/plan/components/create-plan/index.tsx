import { AxiosError } from 'axios';
import { useState } from 'react';
import { AiFillFolderAdd, AiFillPlusCircle } from 'react-icons/ai';
import { FormProvider, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

import CatTyping from '@/app/CatTyping';
import useAxiosAuth from '@/hooks/useAxiosAuth';
import { detailSchemaTest } from '@/components/form/validation/PlanValidator';
import { zodResolver } from '@hookform/resolvers/zod';
import useModal from '@/hooks/useModal';
import NestedForm from '@/app/plan/components/create-plan/nested-form';
import GeneralForm from '@/app/plan/components/create-plan/GeneralForm';
import { IconFlatButton } from '@/components/buttons/IconFlatButton';

const defaultValues = {
  name: '',
  type: '',
  description: '',
  detail: [
    {
      name: [{ label: 'name', value: '' }],
      day: [{ label: 'day', value: '' }],
    },
  ],
};

const CreatePlanForm = () => {
  const axiosAuth = useAxiosAuth();
  const methods = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: zodResolver(detailSchemaTest),
  });
  const { handleSubmit, reset } = methods;

  const { enqueueSnackbar } = useSnackbar();
  const { Modal, openModal, closeModal } = useModal();
  const [waitingResponse, setWaitingReponse] = useState(false);
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => {
  //   reset(defaultValues);
  //   setOpen(false);
  // };

  const onSubmit = async (_data: typeof defaultValues) => {
    setWaitingReponse(true);
    const convertDynamicObject = (objects: any) => {
      if (!objects[0].label) return [];

      return objects.map((object: any) => ({
        label: object.label,
        items: object.items.map((item: any) => item.value),
      }));
    };

    const dto = {
      name: _data.name,
      type: _data.type,
      //description: _data.description.map((obj) => obj.value),
      detail: convertDynamicObject(_data.detail),
    };

    console.log('Create Plan', dto);

    // try {
    //   await axiosAuth.post('/api/plan/create', dto);
    //   enqueueSnackbar('Create Plan Successed', { variant: 'success' });
    //   handleClose();
    // } catch (error) {
    //   if (error instanceof AxiosError) {
    //     enqueueSnackbar(error.response?.data, { variant: 'error' });
    //   }
    // }
    //setWaitingReponse(false);
  };

  return (
    <>
      <IconFlatButton title='testสร้างแผนสุขภาพ' onClick={openModal} />

      <Modal>
        <div className='absolute left-1/2 top-1/2 h-[42rem] -translate-x-1/2 -translate-y-1/2 overflow-scroll rounded-lg bg-white px-20 py-10 shadow-lg'>
          <h1 className='mb-6 flex items-center gap-2'>
            <AiFillFolderAdd className='text-primary inline pt-0.5 text-3xl' />
            <span className='text-2xl font-semibold'>Create Team</span>
          </h1>

          <FormProvider {...methods}>
            <div className='grid w-[850px] grid-cols-2 gap-4'>
              {/* <GeneralForm /> */}

              <div className='flex flex-col gap-4'>
                <NestedForm heading='Plans' name='plans' />
              </div>
            </div>
          </FormProvider>

          <div className='my-8 flex justify-center'>
            <button
              type='button'
              className='bg-default-blue rounded px-8 py-2 font-semibold text-white shadow-lg'
              onClick={handleSubmit(onSubmit)}
            >
              Submit
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreatePlanForm;
