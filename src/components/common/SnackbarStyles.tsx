//Alert SnackbarStyles
import { styled } from '@mui/material/styles';
import { MaterialDesignContent } from 'notistack';

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  () => ({
    '&.notistack-MuiContent': {
      marginTop: '12px',
      padding: '8px 16px',
      borderRadius: '10px',
    },
    '&.notistack-MuiContent-default': {
      backgroundColor: '#7B7B7B', // default gray
    },
    '&.notistack-MuiContent-success': {
      backgroundColor: '#42884B',
    },
    '&.notistack-MuiContent-error': {
      backgroundColor: '#FB6262',
    },
    '&.notistack-MuiContent-warning': {
      backgroundColor: '#FFC556',
    },
    '&.notistack-MuiContent-info': {
      backgroundColor: '#C9E1FD',
    },
  })
);
