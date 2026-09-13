export type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export interface UseFormSubmitResult {
  status: FormStatus;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}
