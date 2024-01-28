'use client';

import { SessionProvider } from 'next-auth/react';
import { SnackbarProvider } from 'notistack';
import { ReactNode } from 'react';

import { StyledMaterialDesignContent } from '@/components/common/alert/SnackbarStyles';

interface Props {
  children: ReactNode;
}

const NextAuthProviders = ({ children }: Props) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      autoHideDuration={2000}
      Components={{
        default: StyledMaterialDesignContent,
        success: StyledMaterialDesignContent,
        error: StyledMaterialDesignContent,
        warning: StyledMaterialDesignContent,
        info: StyledMaterialDesignContent,
      }}
    >
      <SessionProvider>{children}</SessionProvider>
    </SnackbarProvider>
  );
};

export default NextAuthProviders;

// import { createContext, useState } from 'react';ss

// const AuthContext = createContext({});

// export const NextAuthProviders = ({ children }: Props) => {
//   const [auth, setAuth] = useState({});

//   return (
//     <SnackbarProvider
//       maxSnack={5}
//       anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
//     >
//       <AuthContext.Provider value={{ auth, setAuth }}>
//         {children}
//       </AuthContext.Provider>
//     </SnackbarProvider>
//   );
// };

// export default NextAuthProviders;
