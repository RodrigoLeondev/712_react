import { HONEYPOT_FIELD } from '@/infrastructure/lib/constants/forms';
import { useFormSubmit } from '@/infrastructure/lib/hooks/useFormSubmit';
import styles from './Newsletter.module.css';

export default function Newsletter() {
  const { status, onSubmit } = useFormSubmit();

  return (
    <form className={styles.newsletter} onSubmit={onSubmit}>
      <label className={styles.label} htmlFor="newsletter-email">
        Join our newsletter
      </label>

      <input type="hidden" name="subject" value="Nueva suscripción al newsletter" />
      <input type="hidden" name="from_name" value="Landing 712" />

      <input
        type="checkbox"
        name={HONEYPOT_FIELD}
        className={styles.honeypot}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className={styles.control}>
        <input
          id="newsletter-email"
          name="email"
          className={styles.input}
          type="email"
          placeholder="tucorreo@empresa.com"
          autoComplete="email"
          maxLength={120}
          required
        />

        <button
          type="submit"
          className={styles.submit}
          aria-label="Suscribirme"
          disabled={status === 'sending'}
        >
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

      <p className={styles.status} role="status" aria-live="polite">
        {status === 'success' && '¡Listo! Estás suscrito.'}
        {status === 'error' && 'No pudimos suscribirte. Intenta de nuevo.'}
      </p>
    </form>
  );
}
