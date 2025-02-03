import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styles from "./loginPage.module.css";
import RegisterForm from "../../components/forms/register-form/RegisterForm";
import LoginForm from "../../components/forms/login-form/LoginForm";
import Cart from "../../components/cart/Cart";

const LoginPage: React.FC = () => {

    const navigate = useNavigate();
    return (
        <>
            <div className={styles.homepage}>
                <h1>Welcome to Casa Flamingo</h1>
                <button onClick={() => navigate("/login")}>Login</button>
                <button onClick={() => navigate("/register")}>Register</button>
                <button onClick={() => navigate("/")}>Log in as a guest</button>
            </ div>

            <Routes>
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/cart" element={<Cart />} />

            </Routes>
        </>
    );
};

export default LoginPage;
