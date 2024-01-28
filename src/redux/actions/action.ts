// // userActions.js

// import { FormRegisterDoctorProps } from '@/components/form/validation/form-validation';
// import { API_PATH } from '@/config/api';
// import useAxiosAuth from '@/hooks/useAxiosAuth';

// export const registerAndCreateProfile =
//   (data: FormRegisterDoctorProps) => async (dispatch: (arg0: any) => void) => {
//     const axiosAuth = useAxiosAuth();
//     const {
//       role,
//       username,
//       password,
//       passwordConfirm,
//       prefix,
//       firstName,
//       lastName,
//       gender,
//       department,
//       specialist,
//     } = data;

//     try {
//       // API call 1: Register
//       const registerResponse = await axiosAuth.post(
//         '/api/auth/register/other',
//         {
//           role,
//           username,
//           password,
//           passwordConfirm,
//         }
//       );

//       const { id: userId, role: otherRole } = registerResponse.data.data.user;

//       // API call 2: Create profile
//       const createProfileResponse = await axiosAuth.put(
//         `http://localhost:8000/api/user/profile/${otherRole}/${userId}`,
//         {
//           prefix,
//           firstName,
//           lastName,
//           gender,
//           department,
//           specialist,
//         }
//       );

//       // Dispatch actions to update Redux state
//       //dispatch(addUser(createProfileResponse.data.data.user));
//       // You can also dispatch setUsers if you want to update the entire user list

//       return createProfileResponse.data.data.user;
//     } catch (error) {
//       console.error('Error:', error);
//       throw error; // Re-throw the error to handle it in the component
//     }
//   };
