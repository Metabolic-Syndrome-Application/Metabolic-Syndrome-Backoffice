//Change font in mui
import { createTheme } from '@mui/material/styles';
import { IBM_Plex_Sans_Thai } from 'next/font/google';

const IBMPlexSansThai = IBM_Plex_Sans_Thai({
  weight: ['100', '400', '500', '700'],
  subsets: ['thai'],
  variable: '--font-ibm',
});


const theme = createTheme({

  typography: {
    fontFamily: [
      IBMPlexSansThai
    ].join(','),
  },
});

export default theme;