"use client"
import { zodResolver } from "@hookform/resolvers/zod";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserDoctor } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

import { useDoctorOptions } from "@/lib/dataOptions";
import useAxiosAuth from "@/hooks/useAxiosAuth";
import useModal from "@/hooks/useModal";

import ActionButton from "@/components/buttons/ActionButton";
import { IconFlatButton } from "@/components/buttons/IconFlatButton";
import FormHeaderText from "@/components/form/FormHeaderText";
import { InputDropdown } from "@/components/form/InputDropdown";
import { InputText } from "@/components/form/InputText";
import { RadioOption } from "@/components/form/RadioOption";
import { staffEditPatientSchema, staffEditPatientSchemaValues } from "@/components/form/validation/PatientValidator";

import { API_PATH } from "@/config/api";
import { dataOptions, yearOptions } from "@/constant/user";
import { fetchPatientById, selectPatientById } from "@/redux/slices/patientsSlice";


const StaffEditPatientForm = ({ params, loadData }: { params: { id: string }, loadData: () => void }) => {
  //params id
  const id = params.id;
  const axiosAuth = useAxiosAuth();

  const { Modal, openModal, closeModal } = useModal();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<any>();

  const patient = useSelector(selectPatientById);
  const [submittedData, setSubmittedData] = useState<staffEditPatientSchemaValues | null>(null);

  console.log('edit plan', patient)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<staffEditPatientSchemaValues>({
    mode: 'onChange',
    resolver: zodResolver(staffEditPatientSchema),
    defaultValues: submittedData || {},
  });;


  const getDoctorOptions = useDoctorOptions()

  useEffect(() => {
    if (patient) {
      reset(patient);
    }
  }, [patient, reset]);

  const onSubmit = async (data: z.infer<typeof staffEditPatientSchema>) => {
    try {
      // Make the API call and handle success

      const response = await axiosAuth.put(API_PATH.PUT_PROFILE_PATIENT_OTHER(id), {
        hn: data.hn,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        yearOfBirth: data.yearOfBirth,
        mainDoctorID: data.mainDoctorID,
        assistanceDoctorID: data.assistanceDoctorID,
        disease: data.disease,
      });

      // Reload the data after successful edit
      enqueueSnackbar('edit success', { variant: 'success' });
      loadData();
      await dispatch(fetchPatientById(id));

      // closeModal(); // Close the modal if needed
    } catch (error) {
      enqueueSnackbar('Cannot edit', { variant: 'error' });
      console.log('Error:', error);
    }
  };

  return (
    <div className="w-full">
      <article className='flex w-full items-center justify-end px-4 py-2'>
        <IconFlatButton icon={MdEdit} title='แก้ไขข้อมูล' onClick={openModal} />
      </article>

      <Modal>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormHeaderText
            icon={FaUserDoctor}
            title='แก้ไขข้อมูลคนไข้'
            useBigestHeader
          />
          <div className="grid grid-cols-1 w-full">
            {/* Section1 */}
            <div className='col-span-1 w-full lg:w-[800px] space-y-6 rounded-lg border p-4'>
              <FormHeaderText title='ข้อมูลส่วนตัว' />
              <InputText name='hn' label='รหัสคนไข้' control={control} />
              <div className='flex space-x-4'>
                <InputText name='firstName' label='ชื่อจริง' control={control} />
                <InputText name='lastName' label='นามสกุล' control={control} />
              </div>
              <RadioOption
                name='gender'
                label='เพศ'
                control={control}
                options={dataOptions.genderOptions}
              />
              <InputDropdown
                name='yearOfBirth'
                control={control}
                label='ปีเกิด (พ.ศ.)'
                options={yearOptions}
              />
              <FormHeaderText title='แพทย์ผู้รับผิดชอบ' />
              <InputDropdown
                name='mainDoctorID'
                control={control}
                label='แพทย์ผู้รับผิดชอบหลัก'
                options={getDoctorOptions}
              />
              <InputDropdown
                name='assistanceDoctorID'
                control={control}
                label='แพทย์ผู้รับผิดชอบรอง'
                options={getDoctorOptions}
              />
            </div>
          </div>

          <div className="flex gap-4 justify-end mt-4">
            <ActionButton type='submit' variant='submit' >
              แก้ไข
            </ActionButton>
          </div>
        </form>
      </Modal>
    </div>
  );
}
export default StaffEditPatientForm;
