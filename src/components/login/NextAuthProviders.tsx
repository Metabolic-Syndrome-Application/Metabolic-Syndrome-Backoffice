'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode, useState } from 'react';
interface Props {
  children: ReactNode;
}

const NextAuthProviders = ({ children }: Props) => {
  const [interval, setInterval] = useState(0);
  return (
    <SessionProvider refetchInterval={interval}>{children}</SessionProvider>
  );
};

export default NextAuthProviders;

// import { createContext, useState } from "react";

// const AuthContext = createContext({});

// export const AuthProvider = ({ children }) => {
//     const [auth, setAuth] = useState({});

//     return (
//         <AuthContext.Provider value={{ auth, setAuth }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export default AuthContext;
