import { useState } from 'react';

export const useTabbed = () => {
  const [tab, setTab] = useState<number>(0);

  const handleChange = (index: number) => {
    setTab(index);
  };

  return {
    tab,
    handleChange,
  };
};
