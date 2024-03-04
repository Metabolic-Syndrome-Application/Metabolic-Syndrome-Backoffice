import { useSelector } from 'react-redux';

import { selectAllDoctors } from '@/redux/slices/doctorSlice';
import { selectAllPlans } from '@/redux/slices/plansSlice';

import { IGetDoctorOptions } from '@/types/user';

//Get All Doctor
export const useDoctorOptions = () => {
  const doctors = useSelector(selectAllDoctors);
  const doctorOptions = doctors.map((doctor: IGetDoctorOptions) => ({
    label: `${doctor.prefix} ${doctor.firstName} ${doctor.lastName}`,
    value: doctor.id,
  }));

  return doctorOptions;
};

//Get All Plan
// export const usePlanOptions = () => {
//   const plans = useSelector(selectAllPlans);
//   const planOptions = plans.map((plan) => ({
//     label: `${plan.name} ${plan.type}`,
//     value: plan.id,
//   }));

//   return planOptions;
// };

// export const usePlanOptions = () => {
//   const plans = useSelector(selectAllPlans);

//   return plans.map((option: IGetPlanAllOptions) => ({
//     label: `${option.name}`,
//     value: option.id,
//   }));
// };

// export const usePlanOptions = () => {
//   const axiosAuth = useAxiosAuth();
//   const [plans, setPlans] = useState<IGetPlanAllOptions[]>([]);

//   useEffect(() => {
//     const fetchPlans = async () => {
//       try {
//         const response = await axiosAuth.get(API_PATH.GET_PLAN_ALL); // Replace with your API endpoint
//         const planData = response.data.data.plan; // Assuming "plan" is the key in the response
//         setPlans(planData);
//       } catch (error) {
//         console.error('Error fetching plans:', error);
//       }
//     };

//     fetchPlans();
//   }, []);

//   return plans.map((option) => ({
//     label: `${option.name}`,
//     value: option.id,
//   }));
// };

// export const usePlanOptions = () => {
//   const plans = useSelector(selectAllPlans);

//   // Map plans to label and value format
//   return plans.map((option) => ({
//     label: `${option.name}`,
//     value: option.id,
//   }));
// };

export const usePlanOptions = (planID: string[]) => {
  const plans = useSelector(selectAllPlans);

  // Map plans to label and value format
  return plans.map((option) => ({
    label: `${option.name}`,
    value: option.id,
    selected: planID.includes(option.id), // Check if the plan is selected
  }));
};

// const getPlanOptions = (options: IGetPlanAllOptions[]) => {
//   return options.map((option) => ({
//     label: `${option.name}`,
//     value: option.id,
//   }));
// };
