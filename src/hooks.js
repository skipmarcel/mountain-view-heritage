import { useEffect, useState } from 'react';

export function useViewport() {
  const get = () => ({ w: window.innerWidth, h: window.innerHeight, scrollY: window.scrollY });
  const [vp, setVp] = useState(get);
  useEffect(() => {
    const update = () => setVp(get());
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return { ...vp, narrow: vp.w < 820 };
}
