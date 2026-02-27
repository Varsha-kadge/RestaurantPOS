import { useCart } from "../context/useCart";
import { restaurantInfo } from "../data/restaurant";
import { generateBillNumber } from "../Utils/billNumber";
function BillPanel() {
   const { cart, clearCart, increaseQty, decreaseQty, updateQty } = useCart();

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
const CGST = subtotal * 0.025;
const SGST = subtotal * 0.025;
const grandTotal = subtotal + CGST + SGST;
  // const GST_RATE = 0.05; // 5%
  // const gstAmount = subtotal * GST_RATE;
  // const grandTotal = subtotal + gstAmount;
const handlePrintBill = () => {
    if (cart.length === 0) return;

    const billNo = generateBillNumber();
    const dateTime = new Date().toLocaleString();

    const billData = {
      billNo,
      dateTime,
      items: cart,
      subtotal,
      CGST,
      grandTotal,
    };

    // 🔥 Save bill to localStorage
    const existingBills =
      JSON.parse(localStorage.getItem("bills")) || [];

    localStorage.setItem(
      "bills",
      JSON.stringify([...existingBills, billData])
    );

    // 🔥 Create printable window
    const printWindow = window.open("", "", "width=400,height=600");

    printWindow.document.write(`
      <html>
        <head>
          <title>Bill ${billNo}</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2, p { text-align: center; margin: 4px 0; }
            table { width: 100%; margin-top: 10px; border-collapse: collapse; }
            th, td { padding: 6px; text-align: left; }
            .right { text-align: right; }
            hr { margin: 10px 0; }
          </style>
        </head>
        <body>

          <h2>${restaurantInfo.name}</h2>
          <p>${restaurantInfo.address}</p>
          <p>GSTIN: ${restaurantInfo.gstin}</p>
          <hr/>

          <p>Bill No: ${billNo}</p>
          <p>${dateTime}</p>

          <hr/>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Qty</th>
                <th class="right">Price</th>
                <th class="right">Total</th>
              </tr>
            </thead>
            <tbody>
              ${cart
                .map(
                  (item) => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.qty}</td>
                  <td class="right">₹${item.price}</td>
                  <td class="right">₹${
                    item.price * item.qty
                  }</td>
                </tr>`
                )
                .join("")}
            </tbody>
          </table>

          <hr/>

          <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
          <p>CGST (2.5%): ₹${CGST.toFixed(2)}</p>
          <p>SGST (2.5%): ₹${SGST.toFixed(2)}</p>
          <h3>Total: ₹${grandTotal.toFixed(2)}</h3>

          <hr/>
          <p>Thank You! Visit Again 🙏</p>

        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();

    // 🔥 Optional: clear cart after printing
    clearCart();
  };

  return (
    <div className="w-96  bg-white shadow-amber-50 p-6 flex flex-col justify-between">
      <div className="overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          Current Order
        </h2>

        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center mb-4"
          >
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-gray-500">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-gray-300 px-3 py-1" onClick={() =>decreaseQty(item.id)}>-</button>
              <input
        type="number"
        value={item.qty}
        min="1"
        onChange={(e) => updateQty(item.id, e.target.value)}
        className="w-14 text-left px-1 border rounded"
      />
              <button className="bg-gray-300 px-3 py-1" onClick={() =>increaseQty(item.id)}>+</button>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 TOTAL SECTION */}
      <div className="border-t pt-2 space-y-1">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>CGST (2.5%)</span>
          <span>₹{CGST.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>SGST (2.5%)</span>
          <span>₹{SGST.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>

        <button onClick={handlePrintBill} className="bg-green-500 text-white w-full py-2 rounded-lg mt-2">
          Print Bill
        </button>
      </div>
    </div>
  );
}

export default BillPanel;