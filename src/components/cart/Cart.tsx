import React, { useEffect, useState } from "react";
import styles from "./Cart.module.css";
import instance from "../../lib/axios";
import { CartItemBed } from "../../types/types";
import { useNavigate } from "react-router-dom";

const Cart: React.FC = () => {

  const [cartItems, setCartItems] = useState<CartItemBed[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();

  async function fetchCart() {
    try {
      const response = await instance.get("/cart", { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
      setCartItems(response.data?.beds);
      setTotalPrice(response.data?.totalPriceBeds)
    } catch (error) {
      console.error(error);
    }
  }
  // async function fetchTotalPrice() {
  //   try {
  //     const response = await instance.get("/cart/total_price", {
  //       headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` }
  //     });
  //     setTotalPrice(response.data.total || 0); // Если сервак не отправит total, будет 0
  //   } catch (error) {
  //     console.error("Error receiving cart amount", error);
  //   }
  // }

  async function deleteCartItem(id: number) {
    try {
      const res = await instance.delete(`/cart/remove_bed/${id}`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
      if (res.status === 204) {
        fetchCart();
      }
    } catch (error) {
      console.error("Error deleting item from cart", error);
    }
  }

  function handleDeleteItem(id: number) {
    deleteCartItem(id);
  }


  async function clearCart() {
    try {
      const res = await instance.delete(`/cart/clear`, { headers: { Authorization: `Bearer ${localStorage.getItem('accessToken')}` } });
      if (res.status === 204) {
        await fetchCart();
      }
    } catch (error) {
      console.error("Error clearing cart", error);
    }
  }


  function handleCheckout() {
    navigate("/checkout");
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
                <button className={styles.removeButton} onClick={() => handleDeleteItem(cartItem.bed.id)}>Delete</button>

              </li>

            ))}
          </ul>
          <button className={styles.clearButton} onClick={clearCart}> Clear cart</button>
          <div className={styles.summary}>
            <h2  className={styles.totalPrice}>Total price: ${totalPrice}</h2>
            <button className={styles.checkoutButton} onClick={handleCheckout}>
            To pay
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
