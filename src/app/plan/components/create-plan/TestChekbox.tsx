"use client"
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import useAxiosAuth from '@/hooks/useAxiosAuth';

import ActionButton from '@/components/buttons/ActionButton';
import { InputDropdown } from '@/components/form/InputDropdown';
import { MultiselectCheckboxTags } from '@/components/form/MultiselectCheckboxTags';

// Import Day interface
import { API_PATH } from '@/config/api';
import { getPlanOptions } from '@/constant/plan';
import { getDoctorOptions } from '@/constant/user';

import { IGetPlanAllOptions } from '@/types/plan';
import { IGetDoctorOptions } from '@/types/user';


// interface FormData {
//   // day: string[];
//   users: string;
// }
// export const multicheckboxSchema = z.object({
//   day: z
//     .array(z.object({ label: z.string(), value: z.string().min(1) }))
//     .nonempty(),
// });

const TestCheckbox = () => {

  const axiosAuth = useAxiosAuth();

  const {
    control,
    handleSubmit,
  } = useForm({
    mode: 'onChange',
    //resolver: zodResolver(multicheckboxSchema),
  });

  const onSubmit = (data: any) => {
    console.log('Submitted Data:', data);
  };

  //แพทย์ประจำตัวหลักและรอง
  const [options, setOptions] = useState<IGetDoctorOptions[]>([]);
  const getProfileDoctor = async () => {

    try {
      const {
        data: { data },
      } = await axiosAuth.get(API_PATH.GET_PROFILE_ALL_DOCTOR);
      console.log('getProfileDoctor API Response:', data.users); // Log API response

      setOptions(data.users);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const [options2, setOptions2] = useState<IGetPlanAllOptions[]>([]);
  const getPlanOptionsFromAPI = async () => {
    try {
      const {
        data: { data },
      } = await axiosAuth.get(API_PATH.GET_PLAN_ALL);
      setOptions2(data.plan);
    } catch (error) {
      console.error('Error:', error);
    }
  };


  useEffect(() => {

    getPlanOptionsFromAPI();
    //getProfileDoctor();
  }, []);


  return (
    <div>
      <h2>Test Checkbox</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {options2.length > 0 && (
          <MultiselectCheckboxTags
            name='users'
            control={control}
            label='เลือก'
            options={getPlanOptions(options2)}
          />
        )}
        {options.length > 0 && (
          <InputDropdown
            name='users'
            control={control}
            label='แพทย์ผู้รับผิดชอบหลัก'
            options={getDoctorOptions(options)}
          />
        )}
        {/* <AutocompleteControlled name='users' control={control} label='users' /> */}

        <div className='my-8 flex justify-center'>
          <ActionButton type='submit'>Submit</ActionButton>
        </div>

        {/* {errors.users && (
          <p className='error-message'>{errors.users.message}</p>
        )}  */}
      </form>
    </div>
  );
};

export default TestCheckbox;
