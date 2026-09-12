import Newsletter from '@/domain/footer/Newsletter';
import SocialIcon from '@/domain/footer/SocialIcon';
import {
  FOOTER_ADDRESS,
  FOOTER_LEGAL,
  footerLinks,
  socialLinks,
} from '@/domain/footer/footerData';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.frame}>
        <div className={styles.plate}>
          <p className={styles.legal}>{FOOTER_LEGAL}</p>
        </div>

        <div className={styles.card}>
          <div className={styles.brand}>
            <img className={styles.logo} src="/Logo.svg" alt="712 Studio" />

            <h2 className={styles.title}>
              Get, quality business
              <span className={styles.titleAccent}>Performance &amp; growth</span>
            </h2>
          </div>

          <div className={styles.aside}>
            <nav className={styles.nav} aria-label="Enlaces del sitio">
              <ul className={styles.navList}>
                {footerLinks.map((link) => (
                  <li key={link.id}>
                    <a className={styles.navLink} href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.contactRow}>
              <p className={styles.address}>{FOOTER_ADDRESS}</p>

              <ul className={styles.socials}>
                {socialLinks.map((social) => (
                  <li key={social.id}>
                    <a
                      className={styles.social}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={social.label}
                    >
                      <SocialIcon name={social.id} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <Newsletter />
          </div>
        </div>
      </div>
    </footer>
  );
}
