import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface ExtraCardProps {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
}

const ExtraCard: React.FC<ExtraCardProps> = ({ title, description, imageUrl, price }) => {
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();

  const handleChangeQuantity = (amount: number) => {
    setQuantity((prevQuantity) => Math.max(1, prevQuantity + amount));
  };

  const handlePayment = () => {
    if (quantity > 0) {
      navigate("/checkout", { state: { title, totalPrice, quantity } });
    }
  };

  const totalPrice = price * quantity;


  const isButtonDisabled = quantity <= 0;

  return (
    <div style={styles.card}>
      <img src={imageUrl} alt={title} style={styles.image} />
      <h3>{title}</h3>
      <p>{description}</p>
      <p style={styles.price}>Цена: {totalPrice}€</p>
      <div style={styles.quantityControl}>
        <button style={styles.button} onClick={() => handleChangeQuantity(-1)}>-</button>
        <span style={styles.quantity}>{quantity}</span>
        <button style={styles.button} onClick={() => handleChangeQuantity(1)}>+</button>
      </div>
      <button
        style={{
          ...styles.paymentButton,
          backgroundColor: isButtonDisabled ? "#607D8B" : "#4CAF50",
          cursor: isButtonDisabled ? "not-allowed" : "pointer",
        }}
        onClick={handlePayment}
        disabled={isButtonDisabled}
      >
        Оплатить
      </button>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    width: "250px",
    textAlign: "center",
    backgroundColor: "#F9F9F9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    borderRadius: "8px",
  },
  price: {
    fontSize: "16px",
    color: "#333",
  },
  quantityControl: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F9F9F9",
    color: "white",
    border: "none",
    padding: "5px 10px",
    fontSize: "18px",
    cursor: "pointer",
    borderRadius: "5px",
    margin: "0 5px",
  },
  quantity: {
    fontSize: "18px",
    color: "#333",
  },
  paymentButton: {
    marginTop: "10px",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    color: "white",
  },
};

export default ExtraCard;