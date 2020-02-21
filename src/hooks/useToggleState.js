import { useState } from 'react';

export const useToggleState = (initialValue = false) => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => {
    setValue(!value);
  };
  return [value, toggle];
};
