import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from 'yup';
import instance from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import styles from "./BedsFrom.module.css";


const schema = Yup.object({
  number: Yup.string().required("Bed`s number is required!"),
  type: Yup.string().required("Type of bed is required!"),
  price: Yup.number().required("Price is required!"),
});

interface BedsFormProps {
  roomId: number;
}

const BedsForm = ({ roomId }: BedsFormProps) => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();


  const formik = useFormik({
    initialValues: {
      number: '',
      type: '',
      price: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      try {
        const regRes = await instance.post("/beds", { ...values, price: Number(values.price), roomId }, {
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('accessToken')}` },
        });

        if (regRes.status === 201) {
          console.log("Bed added successfully");
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
      <div className={styles.addBed}>
      <h2 className={styles.title}>Add bed</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="text"
            name="number"
            placeholder="bed`s number"
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
          <input
            type="text"
            name="price"
            placeholder="price"
            value={formik.values.price}
            onChange={formik.handleChange}
          />
          {formik.errors.price && <span>{formik.errors.price}</span>}
          <button type="submit" className={styles.btn}>Add</button>
        </form>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </>
  );
};
export default BedsForm;



