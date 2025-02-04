import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import instance from "../../lib/axios";
import {  CartItemBed } from "../../types/types";

const Cart: React.FC = () => {

  const [cartItems, setCartItems] = useState<CartItemBed[]>([]);


  async function fetchCart() {
    try {
      const response = await instance.get("/cart", { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
      setCartItems(response.data?.beds);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchCart()
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cart</h1>
      {cartItems.length === 0 ? (
        <p className={styles.empty}>Cart is empty</p>
      ) : (
        <>
          <ul className={styles.list}>
            {cartItems.map((cartItem: CartItemBed) => (
              <li key={cartItem?.id} className={styles.item}>
                <p>Entry date: {cartItem?.entryDate}</p>
                <p>Departure date: {cartItem?.departureDate}</p>
                <p>Room number: {cartItem?.bed.roomId}</p>
                <p>Bed number: {cartItem?.bed.id}</p>
                <p>Bed price: {cartItem?.bed.price}</p>
              </li>
            ))}
          </ul>
          {/* <div className={styles.summary}>
            <h2>Total amount: ${calculateGrandTotal()}</h2>
            <button className={styles.clearButton} onClick={clearCart}>
              Empty Trash
            </button>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
              Pay
            </button>
          </div> */}
        </>
      )}
    </div>
  );
};

export default Cart;
