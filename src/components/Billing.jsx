import { useState} from "react";

function Billing() {
//   const [menu, setMenu] = useState(() => {
//     return JSON.parse(localStorage.getItem("menu")) || [];
//   });
  const [billItems, setBillItems] = useState([]);

//   useEffect(() => {
//     const savedMenu = JSON.parse(localStorage.getItem("menu")) || [];
//     setMenu(savedMenu);
//   }, []);

  const addToBill = (item) => {
    setBillItems([...billItems, item]);
  };

  const total = billItems.reduce((sum, item) => sum + Number(item.price), 0);
  const profit = billItems.reduce(
    (sum, item) => sum + (Number(item.price) - Number(item.cost)),
    0
  );

  const saveBill = () => {
    const bills = JSON.parse(localStorage.getItem("bills")) || [];

    const newBill = {
      date: new Date().toDateString(),
      items: billItems,
      total,
      profit,
    };

    localStorage.setItem("bills", JSON.stringify([...bills, newBill]));
    setBillItems([]);
    alert("Bill Saved Successfully!");
  };

  return (
    <div>
      <h2>🧾 Billing</h2>

      <h3>Menu</h3>
      {menu.map((item, index) => (
        <button key={index} onClick={() => addToBill(item)}>
          {item.name} - ₹{item.price}
        </button>
      ))}

      <h3>Bill Items</h3>
      <ul>
        {billItems.map((item, index) => (
          <li key={index}>
            {item.name} - ₹{item.price}
          </li>
        ))}
      </ul>

      <h3>Total: ₹{total}</h3>
      <h4>Profit: ₹{profit}</h4>

      <button onClick={saveBill} disabled={billItems.length === 0}>
        Save Bill
      </button>
    </div>
  );
}

export default Billing;