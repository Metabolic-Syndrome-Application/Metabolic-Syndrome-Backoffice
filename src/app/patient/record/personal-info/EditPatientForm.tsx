// "use client"
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useSession } from "next-auth/react";
// import { useSnackbar } from "notistack";
// import { useForm, useFormState } from "react-hook-form";
// import { useDispatch } from "react-redux";

// import { useDoctorOptions } from "@/lib/dataOptions";
// import useAxiosAuth from "@/hooks/useAxiosAuth";

// import ActionButton from "@/components/buttons/ActionButton";
// import FormHeaderText from "@/components/form/FormHeaderText";
// import { InputDropdown } from "@/components/form/InputDropdown";
// import { InputText } from "@/components/form/InputText";
// import { RadioOption } from "@/components/form/RadioOption";
// import { registerNewPatientSchema } from "@/components/form/validation/PatientValidator";

// import { API_PATH } from "@/config/api";
// import { dataOptions, yearOptions } from "@/constant/user";
// import { fetchAllPatients } from "@/redux/slices/patientsSlice";


// const EditPatientForm = () => {
//   const { data: session } = useSession();
//   const axiosAuth = useAxiosAuth();
//   const { enqueueSnackbar } = useSnackbar();
//   const dispatch = useDispatch<any>();

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors, isDirty },
//   } = useForm<FormRegisterDoctorProps>({
//     mode: 'onChange',
//     resolver: zodResolver(registerDoctorSchema),
//   });;

//   const getDoctorOptions = useDoctorOptions()

//   const onSubmit = async (data: FormCreateProfileDoctorProps) => {
//     try {
//       // Make the API call and handle success
//       await axiosAuth.put(`${api}`, {
//         prefix: data.prefix,
//         firstName: data.firstName,
//         lastName: data.lastName,
//         gender: data.gender,
//         department: data.department,
//         specialist: data.specialist,
//       });

//       // Reload the data after successful edit
//       enqueueSnackbar('edit success', { variant: 'success' });
//       loadData();
//       dispatch(fetchAllUsers());

//       closeModal(); // Close the modal if needed
//     } catch (error) {
//       enqueueSnackbar('Cannot edit', { variant: 'error' });
//       console.log('Error:', error);
//     }
//   };

//   return (
//     <form className="flex flex-col w-full" onSubmit={handleSubmit(onHandleFormSubmit)}>
//       <div className="flex flex-col md:flex-row gap-4">
//         {/* Section1 */}
//         <div className='flex w-full md:w-2/5 h-full flex-col space-y-4 rounded-lg border p-4'>
//           <FormHeaderText title='สร้างบัญชีผู้ใช้' />
//           <RadioOption
//             name='role'
//             label='บทบาท'
//             control={control}
//             options={dataOptions.patientOption}
//             defaultValue={dataOptions.patientOption[0].value}
//           />

//           <InputText
//             name='username'
//             label='เลขประตัวประชาชน'
//             control={control}
//           />
//           <InputText
//             name='password'
//             label='รหัสผ่าน'
//             control={control}
//           />
//           <InputText
//             name='passwordConfirm'
//             label='ยืนยันรหัสผ่าน'
//             control={control}
//           />
//         </div>

//         {/* Section2 */}
//         <div className="flex w-full md:w-3/5 h-full flex-col space-y-4 rounded-lg border p-4">
//           <FormHeaderText title='ข้อมูลส่วนตัว' />
//           <InputText name='hn' label='รหัสคนไข้' control={control} />
//           <div className='flex space-x-4'>
//             <InputText name='firstName' label='ชื่อจริง' control={control} />
//             <InputText name='lastName' label='นามสกุล' control={control} />
//           </div>
//           <RadioOption
//             name='gender'
//             label='เพศ'
//             control={control}
//             options={dataOptions.genderOptions}
//           />
//           <InputDropdown
//             name='yearOfBirth'
//             control={control}
//             label='ปีเกิด (พ.ศ.)'
//             options={yearOptions}
//           />
//           <InputDropdown
//             name='mainDoctorID'
//             control={control}
//             label='แพทย์ผู้รับผิดชอบหลัก'
//             options={getDoctorOptions}
//           />
//           <InputDropdown
//             name='assistanceDoctorID'
//             control={control}
//             label='แพทย์ผู้รับผิดชอบรอง'
//             options={getDoctorOptions}
//           />
//           <InputText name='disease' label='โรคที่พบ' control={control} />
//         </div>

//       </div>
//       <div className="flex gap-4 justify-end mt-4">
//         <ActionButton type='submit' variant='submit'>
//           ยืนยันการสมัครบัญชี
//         </ActionButton>
//       </div>
//     </form>
//   );
// }
// export default EditPatientForm;
