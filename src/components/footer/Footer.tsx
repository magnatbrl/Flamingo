
import { NavLink } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa"; // Импорт дополнительных иконок
import styles from './footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <nav className={styles.menu}>
        <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"/profilepage"}>
          My profile
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"/privacypolicy"}>
          Privacy policy
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"/contacts"}>
          Contacts
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? styles.linkActive : '')} to={"/aboutus"}>
          About us
        </NavLink>
      </nav>

      <div className={styles.contactInfo}>
        <div className={styles.contactItem}>
          <FaEnvelope className={styles.icon} />
          <a href="mailto:example@mail.com" className={styles.link}>example@mail.com</a>
        </div>
        <div className={styles.contactItem}>
          <FaPhone className={styles.icon} />
          <a href="tel:+1234567890" className={styles.link}>+1 234 567 890</a>
        </div>
      </div>

      <div className={styles.socialIcons}>
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaFacebook />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaTwitter />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaInstagram />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.icon}>
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
