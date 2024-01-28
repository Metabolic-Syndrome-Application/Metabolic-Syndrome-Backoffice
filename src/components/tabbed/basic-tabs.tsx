'use client';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

export const CustomTabPanel: React.FC<TabPanelProps> = ({
  children,
  value,
  index,
  ...other
}) => {
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

const a11yProps = (index: number) => ({
  id: `simple-tab-${index}`,
  'aria-controls': `simple-tabpanel-${index}`,
});

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box
        sx={{ borderBottom: 1, borderColor: 'divider' }}
        className='bg-blue-50'
      >
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label='basic tabs example'
        >
          <Tab label='ข้อมูลคนไข้' {...a11yProps(0)} />
          <Tab label='ข้อมูลสุขภาพ' {...a11yProps(1)} />
          <Tab label='บันทึกค่าสุขภาพ' {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        ข้อมูลคนไข้
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        ข้อมูลสุขภาพ
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        บันทึกค่าสุขภาพ
      </CustomTabPanel>
    </Box>
  );
}
