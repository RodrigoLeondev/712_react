import { contactFields } from '@/domain/contact/contactData';
import { HONEYPOT_FIELD } from '@/infrastructure/lib/constants/forms';
import { useFormSubmit } from '@/infrastructure/lib/hooks/useFormSubmit';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const { status, onSubmit } = useFormSubmit();

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate={false}>
      <h3 className={styles.title}>Cuéntanos un poco</h3>

      <input
        type="checkbox"
        name={HONEYPOT_FIELD}
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className={styles.fields}>
        {contactFields.map((field) => (
          <div
            key={field.id}
            className={`${styles.field} ${field.half ? styles.half : ''}`}
          >
            <label className={styles.label} htmlFor={field.id}>
              {field.label}
            </label>

            {field.multiline ? (
              <textarea
                id={field.id}
                name={field.id}
                className={`${styles.input} ${styles.textarea}`}
                placeholder={field.placeholder}
                rows={3}
                required={field.required}
                maxLength={field.maxLength}
              />
            ) : (
              <input
                id={field.id}
                name={field.id}
                className={styles.input}
                type={field.type}
                placeholder={field.placeholder}
                required={field.required}
                maxLength={field.maxLength}
              />
            )}
          </div>
        ))}
      </div>

      <button type="submit" className={styles.submit} disabled={status === 'sending'}>
        {status === 'sending' ? 'Enviando…' : 'Send Message'}
      </button>

      <p className={styles.status} role="status" aria-live="polite">
        {status === 'success' && '¡Gracias! Te respondemos pronto.'}
        {status === 'error' && 'No pudimos enviar el mensaje. Intenta de nuevo.'}
      </p>
    </form>
  );
}
