import { useCart } from "../context/useCart";
import { generateBillNumber } from "../Utils/billNumber";
import { useEffect } from "react";
function BillPanel({restaurantInfo}) {
  const { cart, clearCart, increaseQty, decreaseQty, updateQty } = useCart();

  const subtotal = cart.reduce(
  (acc, item) => acc + item.price * item.qty,
  0
);
// subtotal only for GST applicable items
const gstSubtotal = cart.reduce(
  (acc, item) => item.gst ? acc + item.price * item.qty : acc,
  0
);
const totalItems = cart.length;

const totalQty = cart.reduce((sum, item) => {
  return sum + item.qty;
}, 0);
const CGST = gstSubtotal * 0.025;
const SGST = gstSubtotal * 0.025;
const grandTotal = subtotal + CGST + SGST;
  // const GST_RATE = 0.05; // 5%
  // const gstAmount = subtotal * GST_RATE;
  // const grandTotal = subtotal + gstAmount;
  useEffect(() => {
  const handleKeyDown = (event) => {
    if (event.key === "F10") {
      event.preventDefault(); // prevent browser menu
      handlePrintBill();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };

}, [cart]); 
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

@page{
  size:72mm auto;
  margin:0;
}

body{
  width:72mm;
  margin:0;
  padding:4px;
  font-family: monospace;
  font-size:11px;
}

.center{
  text-align:center;
}

.right{
  text-align:right;
}

table{
  width:100%;
  border-collapse:collapse;
}

th, td{
  padding:2px 0;
  font-size:11px;
}

th{
  border-bottom:1px dashed #000;
}

.line{
  border-top:1px dashed #000;
  margin:4px 0;
}

.total{
  font-weight:bold;
  font-size:13px;
}

.item{
  width:50%;
}

.qty{
  width:15%;
}

.price{
  width:15%;
}

.amount{
  width:20%;
}

.small{
  font-size:10px;
}

</style>
</head>

<body>

<div class="center">
<strong>${restaurantInfo[0].storeName}</strong><br>
<span class="small">${restaurantInfo[0].storeAddress}</span><br>
GSTIN: ${restaurantInfo[0].gstin}<br>
Contact: ${restaurantInfo[0].mobileNo}
</div>

<div class="line"></div>

<table>
<tr>
<td>Bill No</td>
<td class="right">${billNo}</td>
</tr>
<tr>
<td>Date</td>
<td class="right">${dateTime}</td>
</tr>
</table>

<div class="line"></div>

<table>
<thead>
<tr>
<th class="item">Item</th>
<th class="qty right">Qty</th>
<th class="price right">Price</th>
<th class="amount right">Total</th>
</tr>
</thead>

<tbody>
${cart.map(item => `
<tr>
<td class="item">${item.item}</td>
<td class="qty right">${item.qty}</td>
<td class="price right">${item.price}</td>
<td class="amount right">${(item.qty * item.price).toFixed(2)}</td>
</tr>
`).join("")}
</tbody>
</table>

<div class="line"></div>

<table>
<tr>
<td>Total Items (${totalItems})</td>
</tr>
<tr>
<td>Total Qty</td>
<td class="right"></td>
<td class="right"></td>
<td>${totalQty}</td>
</tr>
</table>

<div class="line"></div>

<table>
<tr>
<td>Subtotal</td>
<td class="right">₹${subtotal.toFixed(2)}</td>
</tr>
<tr>
<td>CGST (2.5%)</td>
<td class="right">₹${CGST.toFixed(2)}</td>
</tr>
<tr>
<td>SGST (2.5%)</td>
<td class="right">₹${SGST.toFixed(2)}</td>
</tr>
<tr class="total">
<td>Total</td>
<td class="right">₹${grandTotal.toFixed(2)}</td>
</tr>
</table>

<div class="line"></div>

<div class="center">
Thank You! Visit Again 🙏
</div>

<script>
window.onload = function(){
  window.print();
  window.close();
}
</script>

</body>
</html>
`);

    printWindow.document.close();
    printWindow.print();

    // 🔥 Optional: clear cart after printing
    clearCart();
  };

  return (
    <div className="w-96 h-full  bg-white shadow-amber-50 p-6 flex flex-col">
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
              <p className="font-medium">{item.item}</p>
              <p className="text-gray-500">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-gray-300 px-3 py-1" onClick={() => decreaseQty(item.itemId)}>-</button>
              <input
                type="number"
                value={item.qty}
                min="1"
                onChange={(e) => updateQty(item.id, e.target.value)}
                className="w-14 text-left px-1 border rounded"
              />
              <button className="bg-gray-300 px-3 py-1" onClick={() => increaseQty(item.itemId)}>+</button>
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