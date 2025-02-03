
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import styles from "./checkoutPage.module.css";

const CheckoutPage: React.FC = () => {
  const { state } = useLocation();
  const { cart } = state || {};
  const { clearCart } = useCart();
  const navigate = useNavigate();

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handlePaymentSubmit = () => {
    // Сохраняем данные бронирования в профиль пользователя
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      userData.bookings = [...(userData.bookings || []), ...cart];
      localStorage.setItem("user", JSON.stringify(userData));
    }

    clearCart(); // Очищаем корзину после успешной оплаты
    alert("Payment completed successfully!");
    setShowForm(false); // Закрываем форму
    navigate("/profile"); // Перенаправляем пользователя в профиль
  };

  const handlePaymentMethodClick = (method: string) => {
    setSelectedPayment(method);
    setShowForm(true);
  };

  const handleGoBack = () => {
    setShowForm(false); // Закрыть форму и вернуться к выбору способа оплаты
  };

  if (!cart || cart.length === 0) {
    return <p className={styles.emptyCart}>The shopping cart is empty. There is nothing to pay for.</p>;
  }

  return (
    <div className={styles.checkoutContainer}>
      <h1>Payment</h1>
      <p>Check your booking details before paying:</p>
      <ul>
        {cart.map((item: any, index: number) => (
          <li key={index}>
            {item.title}, Dates: {item.checkInDate} - {item.checkOutDate}, ${item.total}
          </li>
        ))}
      </ul>
      <h2>Total amount: ${cart.reduce((total: number, item: any) => total + item.total, 0)}</h2>
      <div className={styles.paymentMethods}>
        <h3>Choose a payment method:</h3>
        <div>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
            alt="Visa"
            onClick={() => handlePaymentMethodClick("Visa")}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
            alt="MasterCard"
            onClick={() => handlePaymentMethodClick("MasterCard")}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
            alt="PayPal"
            onClick={() => handlePaymentMethodClick("PayPal")}
          />
        </div>
      </div>

      {showForm && (
        <div className={styles.paymentForm}>
          <h3>Payment Form ({selectedPayment})</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handlePaymentSubmit();
            }}
          >
            <label>
              Billing Address:
              <input type="text" name="billingAddress" required />
            </label>
            <label>
              Shipping Address:
              <input type="text" name="shippingAddress" required />
            </label>
            <div className={styles.formButtons}>
              <button type="button" className={styles.backButton} onClick={handleGoBack}>
                Back
              </button>
              <button type="submit" className={styles.payButton}>
                Pay Now
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;



