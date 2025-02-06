import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import instance from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import styles from "./RoomForm.module.css";

const schema = Yup.object({
  number: Yup.string().required("Room number is required!"),
  type: Yup.string().required("Type is required!"),
});

const RoomsForm = () => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      number: '',
      type: '',

    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      try {
        const regRes = await instance.post("/rooms", values, {
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
        });

        if (regRes.status === 201) {
          navigate(0);
        }

      } catch (error) {
        // if (error instanceof AxiosError) {
        //   setErrorMessage(error.response?.data?.message || 'An error occurred');
        // }
      }
    },
  });
  return (
    <>
      <div className={styles.container}>
      <h2 className={styles.title}>Add room</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="number"
            placeholder="room number"
            value={formik.values.number}
            onChange={formik.handleChange}
          />
          {formik.errors.number && <div className="error">{formik.errors.number}</div>}
          <input
            type="text"
            name="type"
            placeholder="type"
            value={formik.values.type}
            onChange={formik.handleChange}
          />
          <button type="submit" className={styles.btn}>Add</button>
        </form>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </>
  );
};
export default RoomsForm;



