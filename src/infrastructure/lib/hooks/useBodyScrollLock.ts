import { useEffect } from 'react';

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const root = document.documentElement;
    root.dataset.scrollLocked = 'true';
    return () => {
      delete root.dataset.scrollLocked;
    };
  }, [locked]);
}
