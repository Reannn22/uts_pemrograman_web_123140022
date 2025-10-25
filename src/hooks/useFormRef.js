import { useRef, useEffect } from 'react';

const useFormRef = () => {
  const inputRef = useRef(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    focusInput();
  }, []);

  return { inputRef, focusInput };
};

export default useFormRef;
