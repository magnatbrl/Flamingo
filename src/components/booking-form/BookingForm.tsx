import { useState } from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { AxiosError } from 'axios';
import instance from '../../lib/axios';

const schema = Yup.object({
  entryDate: Yup.date().required("Entry date is required!"),
  departureDate: Yup.date().required("Departure date is required!")
});

interface Props {
  id: number;
}
const BookingForm = ({ id }: Props) => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  const formik = useFormik({
    initialValues: {
      entryDate: '',
      departureDate: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      setErrorMessage(null);
      try {
        await instance.post(`/cart/bed/${id}`, values, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });


      } catch (error) {
        if (error instanceof AxiosError) {
          setErrorMessage(error.response?.data?.message || 'An error occurred');
        }
      }
    },
  });
  return (
    <div className="main-content">
      <div className="login-form">
        <h2>Book bed</h2>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="date"
            name="entryDate"
            placeholder="Entry Date"
            value={formik.values.entryDate}
            onChange={formik.handleChange}
          />
          {formik.errors.entryDate && <div className="error">{formik.errors.entryDate}</div>}
          <input
            type="date"
            name="departureDate"
            placeholder="Departure Date"
            value={formik.values.departureDate}
            onChange={formik.handleChange}
          />
          {formik.errors.departureDate && <span>{formik.errors.departureDate}</span>}
          <button type="submit" className="form-button">Book</button>
        </form>
        {errorMessage && <div className="error">{errorMessage}</div>}
      </div>
    </div>
  );
};
export default BookingForm;


