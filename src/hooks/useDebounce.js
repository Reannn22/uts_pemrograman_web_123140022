import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

useDebounce.propTypes = {
  value: PropTypes.any.isRequired,
  delay: PropTypes.number
};
