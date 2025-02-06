import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import styles from "./CheckoutPage.module.css";
import instance from "../../lib/axios";

const CheckoutPage: React.FC = () => {
  const {  clearCart } = useCart();
  // const navigate = useNavigate();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    async function fetchCart() {
      try {
        const response = await instance.get("/cart", {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        setCartItems(response.data?.beds || []);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }

    async function fetchTotalPrice() {
      try {
        const response = await instance.get("/cart/total_price", {
          headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
        });
        setTotalPrice(response.data.total || 0);
      } catch (error) {
        console.error("Error fetching total price:", error);
      }
    }

    fetchCart();
    fetchTotalPrice();
  }, []);

  const handlePaymentSubmit = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      userData.bookings = [...(userData.bookings || []), ...cartItems];
      localStorage.setItem("user", JSON.stringify(userData));
    }

    clearCart(); // Очищаем корзину после успешной оплаты
    alert("Payment completed successfully!");
    setShowForm(false);
   
  };

  const handlePaymentMethodClick = (method: string) => {
    setSelectedPayment(method);
    setShowForm(true);
  };

  if (cartItems.length === 0) {
    return <p className={styles.emptyCart}>The shopping cart is empty. There is nothing to pay for.</p>;
  }
 

  return (
    <div className={styles.checkoutContainer}>
      <h1>Payment</h1>
      <p>Check your booking details before paying:</p>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            Room {item.bed.roomId}, Bed {item.bed.id}, Dates: {item.entryDate} - {item.departureDate}, ${item.bed.price}
          </li>
        ))}
      </ul>
      <h2>Total amount: ${totalPrice}</h2>
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
              <button type="button" className={styles.backButton} onClick={() => setShowForm(false)}>
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
