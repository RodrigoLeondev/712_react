export interface ContactField {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  half?: boolean;
  multiline?: boolean;
  required?: boolean;
  maxLength?: number;
}
