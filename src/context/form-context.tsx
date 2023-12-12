// import { createContext, useState } from 'react';
// import React, { FC, ReactNode } from 'react';

// type Props = {
//   children: ReactNode;
// };

// const FormContext = createContext({});

// export const FormProvider: FC<Props> = ({ children }) => {
//   const title = {
//     0: 'จัดการข้อมูลคนไข้',
//     1: 'การเชื่อมต่อกับคนไข้',
//   };

//   const [data, setData] = useState({
//     patient: {
//       IDCard: '',
//       password: '',
//       confirmPassword: '',
//       HN: '',
//       firstname: '',
//       lastname: '',
//       gender: '',
//       firstDoctor: '',
//       secondaryDoctor: '',
//     },
//   });

//   return <FormContext.Provider value={{title, page, setPage ,}}>{children}</FormContext.Provider>;
// };

// export default FormContext;
