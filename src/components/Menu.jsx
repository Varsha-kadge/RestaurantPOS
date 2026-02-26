import { useState } from "react";

function Menu() {
  const [menu, setMenu] = useState(() => {
  return JSON.parse(localStorage.getItem("menu")) || [];
});
  const [item, setItem] = useState({ name: "", price: "", cost: "" });

//   useEffect(() => {
//     const savedMenu = JSON.parse(localStorage.getItem("menu")) || [];
//     setMenu(savedMenu);
//   }, []);

  const addItem = () => {
    if (!item.name || !item.price || !item.cost) return;

    const updatedMenu = [...menu, item];
    setMenu(updatedMenu);
    localStorage.setItem("menu", JSON.stringify(updatedMenu));
    setItem({ name: "", price: "", cost: "" });
  };

  return (
    <div>
      <h2>📋 Menu Management</h2>

      <input
        placeholder="Item Name"
        value={item.name}
        onChange={(e) => setItem({ ...item, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Selling Price"
        value={item.price}
        onChange={(e) => setItem({ ...item, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cost Price"
        value={item.cost}
        onChange={(e) => setItem({ ...item, cost: e.target.value })}
      />
      <button onClick={addItem}>Add Item</button>

      <ul>
        {menu.map((m, index) => (
          <li key={index}>
            {m.name} - ₹{m.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Menu;