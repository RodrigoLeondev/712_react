import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  HCAPTCHA_FIELD,
  HONEYPOT_FIELD,
  RECAPTCHA_COMPAT_FIELD,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
} from '@/infrastructure/lib/constants/forms';
import type { FormStatus, UseFormSubmitResult } from '@/infrastructure/lib/hooks/types';

export function useFormSubmit(): UseFormSubmitResult {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [message, setMessage] = useState('');

  const fail = (text: string) => {
    setStatus('error');
    setMessage(text);
    window.hcaptcha?.reset();
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get(HONEYPOT_FIELD)) {
      setStatus('success');
      setMessage('');
      form.reset();
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      fail('Falta configurar la clave de acceso.');
      return;
    }

    if (!data.get(HCAPTCHA_FIELD)) {
      setStatus('captcha');
      setMessage('');
      return;
    }

    setStatus('sending');
    setMessage('');
    data.delete(RECAPTCHA_COMPAT_FIELD);
    data.append('access_key', WEB3FORMS_ACCESS_KEY);

    fetch(WEB3FORMS_ENDPOINT, { method: 'POST', body: data })
      .then((response) => response.json().catch(() => ({})))
      .then((body: { success?: boolean; message?: string }) => {
        if (!body.success) {
          fail(body.message ?? 'No pudimos enviar el mensaje. Intenta de nuevo.');
          return;
        }
        setStatus('success');
        setMessage('');
        form.reset();
        window.hcaptcha?.reset();
      })
      .catch(() => fail('No pudimos conectar con el servidor. Intenta de nuevo.'));
  };

  return { status, message, onSubmit };
}
