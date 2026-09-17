export type FormStatus = 'idle' | 'sending' | 'success' | 'error' | 'captcha';

export interface UseFormSubmitResult {
  status: FormStatus;
  message: string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
