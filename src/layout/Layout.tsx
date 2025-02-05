import { Outlet } from "react-router-dom";
import styles from './layout.module.css'
import Footer from "../components/footer/Footer";


export default function Layout() {

  return (
    <>
   
      {/* здесь вызов компонента header для верстки шапки сайта */}

      <main className={styles.main}>
        {/* за место компонента Outlet будут приходить переключаемые компоненты из маршрутизации */}
        <Outlet />
      </main>

    
    </>
  );
}
