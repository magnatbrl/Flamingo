
import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./header.module.css";
import BurgerMenu from "../burger-menu/BurgerMenu";

import { useAuth } from "../../hooks/useAuth";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "Cart", path: "cart" },
  ];

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };




  const { isAuthorized, setIsAuthorized, setUser, user } = useAuth();
  function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isAuthorized");
    setIsAuthorized(false);
    setUser(undefined);
  }


  return (
    <header className={styles.header}>
      <div className={styles.background}>

        <div className={styles.logo}>
          <img src="../../../public/assets/images/logo.png" alt="Casa Flamingo Logo" className={styles.headerImage} />
        </div>
        <nav className={styles.nav}>
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}
              to={item.path}
            >
              {item.name}
            </NavLink>
          ))}
          {isAuthorized ?
            <>
              {user?.roles.find((role) => role.name === "ROLE_ADMIN") ?
                <NavLink
                  className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}
                  to="/admin/rooms"
                >
                  Rooms management
                </NavLink> : null}
              {/* <button onClick={logout}>Log out</button> */}
              <NavLink onClick={logout} className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>Log out</NavLink>
            </>
            : <NavLink to={"loginpage"} className={({ isActive }) => (isActive ? styles.linkActive : styles.link)}>Login</NavLink>}
        </nav>
        <div className={styles.overlay}>
          <h1 className={styles.title}>Casa Flamingo</h1>
          <p className={styles.subtitle}>Hostel</p>
        </div>
      </div>
      {isMenuOpen && (
        <BurgerMenu
          isMenuOpen={isMenuOpen}
          toggleMenu={toggleMenu}
          onNavigate={(path: string) => {
            navigate(path);
            setIsMenuOpen(false);
          }}
          menuItems={menuItems}
        />
      )}
    </header>
  );
};

export default Header;