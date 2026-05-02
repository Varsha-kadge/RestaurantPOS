import { useState } from "react";
import CartContext from "./CartContext";

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.itemId === product.itemId
      );
     const qtyToAdd = product.qty ? Number(product.qty) : 1;
      if (existing) {
        return prev.map((item) =>
          item.itemId === product.itemId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: qtyToAdd }];
    });
  };
   const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.itemId === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    );
  };
  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.itemId === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };
 const updateQty = (id, qty) => {
  // ✅ allow empty input
  if (qty === "") {
    setCart((prev) =>
      prev.map((item) =>
        item.itemId === id ? { ...item, qty: "" } : item
      )
    );
    return;
  }

  const parsedQty = parseFloat(qty);

  if (isNaN(parsedQty)) return;

  setCart((prev) =>
    prev.map((item) =>
      item.itemId === id
        ? { ...item, qty: parsedQty }
        : item
    )
  );
};
const updatePrice = (id, price) => {
  if (price === "") {
    setCart((prev) =>
      prev.map((item) =>
        item.itemId === id ? { ...item, price: "" } : item
      )
    );
    return;
  }

  const parsedPrice = parseFloat(price);

  if (isNaN(parsedPrice)) return;

  setCart((prev) =>
    prev.map((item) =>
      item.itemId === id
        ? { ...item, price: parsedPrice }
        : item
    )
  );
};
const removeItem = (id) => {
  setCart(cart.filter(item => item.itemId !== id));
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
        updateQty,
        updatePrice,
        removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;