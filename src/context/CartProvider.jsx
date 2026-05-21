import { useState } from "react";
import CartContext from "./CartContext";

function CartProvider({ children }) {
  // ✅ multiple tables instead of single cart
  const [tables, setTables] = useState({
  "Table 1": [],
  "Table 2": [],
  "Table 3": [],
  "Table 4": [],
  "Table 5": [],
  "Table 6": [],
  "Table 7": [],
  "Table 8": [],
  "Table 9": [],
  "Table 10": [],
});

const [selectedTable, setSelectedTable] =
  useState("Table 1");

  // ✅ helper to get cart
  const getCart = (tableId) => tables[tableId] || [];

  // ✅ ADD ITEM
  const addToCart = (tableId, product) => {
    setTables((prev) => {
      const cart = prev[tableId] || [];
      const existing = cart.find(
        (item) => item.itemId === product.itemId
      );

      const qtyToAdd = product.qty ? Number(product.qty) : 1;

      let updatedCart;

      if (existing) {
        updatedCart = cart.map((item) =>
          item.itemId === product.itemId
            ? { ...item, qty: item.qty + qtyToAdd }
            : item
        );
      } else {
        updatedCart = [...cart, { ...product, qty: qtyToAdd }];
      }

      return { ...prev, [tableId]: updatedCart };
    });
  };

  // ✅ INCREASE
  const increaseQty = (tableId, id) => {
    setTables((prev) => ({
      ...prev,
      [tableId]: prev[tableId].map((item) =>
        item.itemId === id
          ? { ...item, qty: item.qty + 1 }
          : item
      )
    }));
  };

  // ✅ DECREASE
  const decreaseQty = (tableId, id) => {
    setTables((prev) => ({
      ...prev,
      [tableId]: prev[tableId]
        .map((item) =>
          item.itemId === id
            ? { ...item, qty: item.qty - 1 }
            : item
        )
        .filter((item) => item.qty > 0)
    }));
  };

  // ✅ UPDATE QTY
  const updateQty = (tableId, id, qty) => {
    if (qty === "") {
      setTables((prev) => ({
        ...prev,
        [tableId]: prev[tableId].map((item) =>
          item.itemId === id ? { ...item, qty: "" } : item
        )
      }));
      return;
    }

    const parsedQty = parseFloat(qty);
    if (isNaN(parsedQty)) return;

    setTables((prev) => ({
      ...prev,
      [tableId]: prev[tableId].map((item) =>
        item.itemId === id
          ? { ...item, qty: parsedQty }
          : item
      )
    }));
  };

  // ✅ UPDATE PRICE
  const updatePrice = (tableId, id, price) => {
    if (price === "") {
      setTables((prev) => ({
        ...prev,
        [tableId]: prev[tableId].map((item) =>
          item.itemId === id ? { ...item, price: "" } : item
        )
      }));
      return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) return;

    setTables((prev) => ({
      ...prev,
      [tableId]: prev[tableId].map((item) =>
        item.itemId === id
          ? { ...item, price: parsedPrice }
          : item
      )
    }));
  };

  // ✅ REMOVE ITEM
  const removeItem = (tableId, id) => {
    setTables((prev) => ({
      ...prev,
      [tableId]: prev[tableId].filter(
        (item) => item.itemId !== id
      )
    }));
  };

  // ✅ CLEAR CART (per table)
  const clearCart = (tableId) => {
    setTables((prev) => ({
      ...prev,
      [tableId]: []
    }));
  };

  return (
    <CartContext.Provider
      value={{
        selectedTable,
        setSelectedTable,
        getCart,
        addToCart,
        increaseQty,
        decreaseQty,
        updateQty,
        updatePrice,
        removeItem,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;