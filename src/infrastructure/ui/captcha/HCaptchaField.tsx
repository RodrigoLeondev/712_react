import { useEffect, useRef } from 'react';
import {
  HCAPTCHA_SCRIPT,
  HCAPTCHA_SITEKEY,
} from '@/infrastructure/lib/constants/forms';
import styles from './HCaptchaField.module.css';

let scriptPromise: Promise<void> | null = null;

function loadHCaptcha(): Promise<void> {
  if (scriptPromise) return scriptPromise;

  scriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = HCAPTCHA_SCRIPT;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('No se pudo cargar hCaptcha'));
    document.head.appendChild(script);
  });

  return scriptPromise;
}

export default function HCaptchaField() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cancelled = false;

    loadHCaptcha()
      .then(() => {
        const container = containerRef.current;
        if (cancelled || !container || container.childElementCount > 0) return;
        window.hcaptcha?.render(container, {
          sitekey: HCAPTCHA_SITEKEY,
          theme: 'light',
        });
      })
      .catch(() => undefined);

    return () => {
      cancelled = true;
    };
  }, []);

  return <div ref={containerRef} className={styles.captcha} />;
}
