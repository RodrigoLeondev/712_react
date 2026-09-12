import type { FormEvent } from 'react';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form className={styles.newsletter} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor="newsletter-email">
        Join our newsletter
      </label>

      <div className={styles.control}>
        <input
          id="newsletter-email"
          name="email"
          className={styles.input}
          type="email"
          placeholder="tucorreo@empresa.com"
          autoComplete="email"
          required
        />

        <button type="submit" className={styles.submit} aria-label="Suscribirme">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false">
            <path
              d="M5 12h13m-5.5-6.5L19 12l-6.5 6.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}
