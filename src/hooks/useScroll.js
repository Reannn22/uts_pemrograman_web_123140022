import { useCallback } from 'react';

export const useScroll = () => {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToElement = useCallback((ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return { scrollToTop, scrollToElement };
};
