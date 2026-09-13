import { useState } from 'react';
import type { FormEvent } from 'react';
import {
  HONEYPOT_FIELD,
  WEB3FORMS_ACCESS_KEY,
  WEB3FORMS_ENDPOINT,
} from '@/infrastructure/lib/constants/forms';
import type { FormStatus, UseFormSubmitResult } from '@/infrastructure/lib/hooks/types';

export function useFormSubmit(): UseFormSubmitResult {
  const [status, setStatus] = useState<FormStatus>('idle');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'sending') return;

    const form = event.currentTarget;
    const data = new FormData(form);

    if (data.get(HONEYPOT_FIELD)) {
      setStatus('success');
      form.reset();
      return;
    }

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    data.append('access_key', WEB3FORMS_ACCESS_KEY);

    fetch(WEB3FORMS_ENDPOINT, { method: 'POST', body: data })
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        setStatus('success');
        form.reset();
      })
      .catch(() => setStatus('error'));
  };

  return { status, onSubmit };
}
