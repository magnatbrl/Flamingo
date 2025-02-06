import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import instance from '../../../lib/axios';
import { AxiosError } from 'axios';
import styles from "./RegisterForm.module.css";
import { useNavigate } from 'react-router-dom';


const schema = Yup.object({
  firstName: Yup.string().required("First Name is required!"),
  lastName: Yup.string().required("Last Name is required!"),
  phoneNumber: Yup.string().min(8, "Phone needs to be more than 8 characters!").required("Phone is required!"),
  userEmail: Yup.string().email("Invalid email address").required("Email is required!"),
  password: Yup.string().min(8, "Password needs to be more than 8 characters!").required("Password is required!"),
});
const RegisterForm = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      phoneNumber: "",
      userEmail: '',
      password: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      try {

        await instance.post("/auth/register", values, {
          headers: { 'Content-Type': 'application/json' },
        });

        navigate('/login');
      } catch (error) {
        if (error instanceof AxiosError) {
          // console.log(error.response?.data?.message);
          // setErrorMessage(error.response?.data?.message);
          const errorMsg = error.response?.data?.message;
          console.log(errorMsg);
          setErrorMessage(errorMsg);

          if (errorMsg?.toLowerCase().includes("user already exists")) {
            setTimeout(() => navigate('/login'), 2000); // Перенаправляем через 2 сек
          }
        }
      }
    },
  });
  return (

    <div className={styles.registerForm}>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
        />
        {formik.errors.firstName && <div className={styles.error}>{formik.errors.firstName}</div>}
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
        />
        {formik.errors.lastName && <div className={styles.error}>{formik.errors.lastName}</div>}
        <input
          type="text"
          name="phoneNumber"
          placeholder="Phone"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
        />
        {formik.errors.phoneNumber && <div className={styles.error}>{formik.errors.phoneNumber}</div>}
        <input
          type="email"
          name="userEmail"
          placeholder="Email"
          value={formik.values.userEmail}
          onChange={formik.handleChange}
        />
        {formik.errors.userEmail && <div className={styles.error}>{formik.errors.userEmail}</div>}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        {formik.errors.password && <div className={styles.error}>{formik.errors.password}</div>}
        <button type="submit" className={styles.formButton}>Register</button>
      </form>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </div>

  );
};
export default RegisterForm;