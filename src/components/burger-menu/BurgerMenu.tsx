import React from "react";
import styles from './burgermenu.module.css';

interface MenuItem {
  name: string;
  path: string;
}

interface BurgerMenuProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  onNavigate: (path: string) => void;
  menuItems: MenuItem[];
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ isMenuOpen, toggleMenu, onNavigate, menuItems }) => {
  return (
    <div className={`${styles.burgerMenu} ${isMenuOpen ? styles.open : ''}`}>
      <button onClick={toggleMenu} className={styles.closeButton}>✖</button>
      <ul className={styles.menuList}>
        {menuItems.map((item, index) => (
          <li key={index} onClick={() => onNavigate(item.path)} className={styles.menuItem}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BurgerMenu;
