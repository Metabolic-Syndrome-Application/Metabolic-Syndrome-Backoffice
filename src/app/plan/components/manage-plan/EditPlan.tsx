"use client"
import { useSnackbar } from 'notistack';
import React, { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { MdOutlineCreateNewFolder } from 'react-icons/md';
import { useDispatch } from 'react-redux';

import useAxiosAuth from '@/hooks/useAxiosAuth';
import useModal from '@/hooks/useModal';

import ActionButton from '@/components/buttons/ActionButton';
import UploadImageDisplay from '@/components/form/components/UploadImageDisplay';
import FormHeaderText from '@/components/form/FormHeaderText';
import { InputDropdown } from '@/components/form/InputDropdown';
import { InputText } from '@/components/form/InputText';
import TiptapTextField from '@/components/text-editor/TipTapTextField';

import DetailPlanFields from '@/app/plan/components/create-plan/nested-form/DetailPlanFields';
import { API_PATH } from '@/config/api';
import { typePlanOptions } from '@/constant/plan';
import { dayOfWeekThaiLabel } from '@/helpers/date';
import { fetchPlanById } from '@/redux/slices/plansSlice';

interface IPlanProps {
  loadData: () => void;
  id: string;
  api: string;
}

const EditPlan = ({ params, loadData }: { params: { id: string }, loadData: () => void }) => {
  const id = params.id;

  const axiosAuth = useAxiosAuth();
  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar()

  const dispatch = useDispatch<any>();
  // const plans = useSelector(selectAllPlans);
  // const currentPlan = plans.find((plan) => plan.id === id);

  // const plan = plans.find((item) => {
  //   return item.id === (id)
  // });

  ///const planId = useSelector((state: any) => selectPlanById(state, id));

  const methods = useForm({
    mode: 'onChange',
    //resolver: zodResolver(createPlanSchema),
    defaultValues: async () => {
      const response = await axiosAuth.get(`/api/plan/${id}`);
      const data = await response.data.data.plan
      console.log('defaultValues', data)

      const thaiDays = data?.detail.day.map((dayItem: string) => ({
        label: dayOfWeekThaiLabel(dayItem), // Convert English day name to Thai label
        value: dayItem
      }));
      return {
        name: data.name,
        type: data.type,
        description: data?.description,
        detail: {
          // name: data?.detail.name.map((item: any) => ({ name: item })), // Map each name to an object
          name: data?.detail.name.map((nameItem: any) => ({ name: nameItem })), // Convert name array to array of objects
          //day: data?.detail.day.map((dayItem: string) => ({ label: dayItem, value: dayItem })) // Map each day string to an object with label and value
          day: thaiDays
        }
      }
    }
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = methods;

  useEffect(() => {
    dispatch(fetchPlanById(id));
  }, [dispatch, id]);


  const onSubmit = async (data: any) => {
    try {
      const selectedDays = data.detail.day.map(
        (day: { value: string }) => day.value
      );
      // Make the API call and handle success
      await axiosAuth.put(API_PATH.PUT_PLAN(id), {
        name: data.name,
        description: data.description,
        type: data.type,
        photo: data.photo,
        detail: {
          name: data.detail.name.map((item: any) => item.name),
          day: selectedDays,
        },
      });
      console.log('edit plan', data)

      enqueueSnackbar('Edit Plan Success', { variant: 'success' });
      // await dispatch(fetchAllPlans());
      // await dispatch(fetchPlanById(id));  loadData();
      loadData();


    } catch (error: any) {
      enqueueSnackbar(error.response?.data, { variant: 'error' });
      console.error(error);
    }
  };



  // Fetch plan data by ID on component mount
  useEffect(() => {
    dispatch(fetchPlanById(id)); // Fetch plan by ID
  }, [dispatch, id]);


  return (
    <div className='w-full'>
      <article className='flex w-full items-center justify-end p-4'>
        <FiEdit
          className='hover:bg-light-gray text-default-blue group h-5 w-5 cursor-pointer rounded-md transition-all duration-300 ease-in-out'
          onClick={openModal}
        />
      </article>

      <Modal>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormHeaderText
              icon={MdOutlineCreateNewFolder}
              title='สร้างแผนสุขภาพ'
              useBigestHeader
            />
            <div className='grid w-full grid-cols-1 gap-4 md:grid-cols-7'>
              {/* section1 */}
              <div className='col-span-1 space-y-4 rounded-lg md:col-span-4'>
                <InputText name='name' control={control} label='ชื่อโปรแกรม' />
                <InputDropdown
                  name='type'
                  control={control}
                  label='ประเภท'
                  options={typePlanOptions}
                />
                <TiptapTextField
                  name='description'
                  control={control}
                  label='รายละเอียด'
                />
              </div>

              {/* section2 : wait picture */}
              <div className='order-first col-span-1 space-y-4 rounded-lg md:order-none md:col-span-3'>
                <UploadImageDisplay displayType='large' />
                {/* <InputText name='photo' control={control} label='photo' /> */}
              </div>

              {/* section3 : detail */}
              <div className='col-span-1 space-y-4 rounded-lg md:col-span-7'>
                <DetailPlanFields />
              </div>
            </div>

            <div className='flex h-full justify-end space-x-3 p-4'>
              <ActionButton
                type='reset'
                variant='cancel'
                onClick={closeModal}
              >
                ยกเลิก
              </ActionButton>
              <ActionButton type='submit' variant='submit'>
                แก้ไข
              </ActionButton>
            </div>
          </form>
        </FormProvider>
      </Modal>
    </div>
  );
};

export default EditPlan;
