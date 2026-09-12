import type { FormEvent } from 'react';
import { contactFields } from '@/domain/contact/contactData';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <h3 className={styles.title}>Cuéntanos un poco</h3>

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
              />
            ) : (
              <input
                id={field.id}
                name={field.id}
                className={styles.input}
                type={field.type}
                placeholder={field.placeholder}
              />
            )}
          </div>
        ))}
      </div>

      <button type="submit" className={styles.submit}>
        Send Message
      </button>
    </form>
  );
}
