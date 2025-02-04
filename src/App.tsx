import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import SplashScreen from "./components/splash-screen/SplashScreen";
import CookieConsentModal from "./components/cookie-consent-modul/CookieConsentModal";
import styles from "./app.module.css";
import HomePage from "./pages/home-page/HomePage";
import RegisterForm from "./components/forms/register-form/RegisterForm";
import LoginForm from "./components/forms/login-form/LoginForm";

import Layout from "./layout/Layout";
import Cart from "./components/cart/Cart";
import CheckoutPage from "./pages/checkout-page/CheckoutPage";
import LoginPage from "./pages/login-page/LoginPage";
import ProfilePage from "./pages/profile-page/ProfilePage";
import Aboutus from "./pages/web-pages/about-us/AboutUs";
import Contacts from "./pages/web-pages/contacts/Contacts";
import Privacypolicy from "./pages/web-pages/privacy-policy/PrivacyPolicy";
import RoomsPage from "./pages/rooms-page/RoomsPage";
import RoomPage from "./pages/room-page/RoomPage";
import Footer from "./components/footer/Footer";
const App: React.FC = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashScreen(false);
      setShowCookieConsent(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  const handleAcceptCookies = () => {
    setShowCookieConsent(false);
  };

  return (
    <>
      {showSplashScreen && <SplashScreen onClose={() => setShowSplashScreen(false)} />}
      {showCookieConsent && <CookieConsentModal onAccept={handleAcceptCookies} />}
      {!showSplashScreen && (
        <>
          <Header />
          <main>
            <div className={styles.maincontent}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/" element={<Layout />}>
                  <Route path="loginpage" element={<LoginPage />} />
                  {/* <Route path="/bets/:id" element={<BedsPage />} /> */}
                  <Route path="contacts" element={<Contacts />} />
                  <Route path="aboutus" element={<Aboutus />} />
                  <Route path="privacypolicy" element={<Privacypolicy />} />
                  <Route path="/rooms/:id" element={<RoomPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/profilepage" element={<ProfilePage />} />
                  <Route path="/admin/rooms" element={<RoomsPage />} />
                </Route>

              </Routes>
            </div>
          </main>
          <Footer />
        </>
      )}
    </>
  );
};
export default App;
