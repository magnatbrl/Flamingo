import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import instance from '../../../lib/axios';
import { AxiosError } from 'axios';
import { useAuth } from '../../../hooks/useAuth';
import styles from "./LoginForm.module.css";

const schema = Yup.object({
  userEmail: Yup.string().required("Username is required!"),
  password: Yup.string()
    .required("Password is required!")
    .min(8, "Password must be at least 8 characters long!")
    .matches(/[A-Z]/, "Password must include at least one uppercase letter!")
    .matches(/[a-z]/, "Password must include at least one lowercase letter!")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must include at least one special character!"),
});
const LoginForm = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { setIsAuthorized } = useAuth()
  const formik = useFormik({
    initialValues: {
      userEmail: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      try {
        const regRes = await instance.post("/auth/login", values, {
          headers: { 'Content-Type': 'application/json' },
        });
        localStorage.setItem('accessToken', regRes.data.accessToken);
        localStorage.setItem('isAuthorized', JSON.stringify(true));
        setIsAuthorized(true);
        navigate('/');
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message || 'An error occurred');
        }
      }
    },
  });
  return (

      <div className= {styles.loginForm}>
        <h2>Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            name="userEmail"
            placeholder="Useremail"
            value={formik.values.userEmail}
            onChange={formik.handleChange}
          />
          {formik.errors.userEmail && <div className= {styles.error}>{formik.errors.userEmail}</div>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && <span>{formik.errors.password}</span>}
          <button type="submit" className={styles.formButton}>Login</button>
        </form>
        {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      </div>
   
  );
};
export default LoginForm;


