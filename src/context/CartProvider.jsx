import { useState } from "react";
import CartContext from "./CartContext";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };
   const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };
  const updateQty = (id, qty) => {
  if (qty < 1) return;

  setCart((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, qty: Number(qty) }
        : item
    )
  );
};
  const clearCart = () => {
  setCart([]);
};
  return (
    <CartContext.Provider value={{ cart,
        addToCart,
        increaseQty,
        decreaseQty,
        clearCart,
        updateQty }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;