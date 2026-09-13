import Title from '@/infrastructure/ui/text/Title';
import ContactForm from '@/domain/contact/ContactForm';
import styles from './Contact.module.css';

export default function Contact() {
  return (
    <>
      <p className={styles.subtitle}>
        <span>
          ¿Tienes un <span className={styles.highlight}>proyec</span>
          <span className={styles.tail}>to?</span>
        </span>
        <span>{"We're happy to help!"}</span>
      </p>

      <Title title="Contacto" />

      <div className={styles.card}>
        <div className={styles.visual}>
          <img
            className={styles.flower}
            src="/animations/flower.svg"
            alt=""
            aria-hidden="true"
            loading="lazy"
          />
        </div>

        <ContactForm />
      </div>
    </>
  );
}
