import { useCart } from "../context/useCart";
import { generateBillNumber } from "../Utils/billNumber";
import { useEffect } from "react";
function BillPanel({tableId,restaurantInfo}) {
  const {
  selectedTable,
  getCart,
  increaseQty,
  decreaseQty,
  updateQty,
  updatePrice,
  removeItem,
  clearCart,
  
} = useCart();

const cart = getCart(tableId);
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
  font-size:16px;
}

.center{
  text-align:center;
}

.right{
  text-align:right;
}

table{
  width:100%;
  margin-left:2px;
  border-collapse:collapse;
}

th, td{
  padding:2px 0;
  font-size:15px;
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
  font-size:17px;
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
  font-size:14px;
}
strong{
font-size:20px;
}
</style>
</head>

<body>

<div class="center">
<strong>${restaurantInfo[0].storeName.toUpperCase()}</strong><br>
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
<td>Total Qty (${totalQty})</td>
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
    clearCart(tableId);
  };
  const handlePrintKOT = () => {
  if (cart.length === 0) return;

  const dateTime = new Date().toLocaleString();

  const printWindow = window.open(
    "",
    "",
    "width=300,height=500"
  );

  printWindow.document.write(`
<html>
<head>
<title>KOT - ${tableId}</title>

<style>
@page{
  size:72mm auto;
  margin:0;
}

body{
  width:72mm;
  padding:5px;
  font-family: monospace;
  font-size:18px;
}

.center{
  text-align:center;
}

.line{
  border-top:1px dashed #000;
  margin:6px 0;
}

table{
  width:100%;
  border-collapse:collapse;
  margin-left:0;
}

th, td{
  padding:4px 0;
  font-size:16px;
  padding:2px 0;
  text-align:left;
}

th{
  border-bottom:1px dashed #000;
}

.right{
  text-align:right;
}

strong{
  font-size:20px;
}
</style>
</head>

<body>

<div class="center">
  <strong>KOT</strong><br/>
  ${tableId}<br/>
  ${dateTime}
</div>

<div class="line"></div>

<table>
  <thead>
    <tr>
      <th>Item</th>
      <th class="right">Qty</th>
    </tr>
  </thead>

  <tbody>
    ${cart
      .map(
        (item) => `
      <tr>
        <td>${item.item}</td>
        <td class="right">${item.qty}</td>
      </tr>
    `
      )
      .join("")}
  </tbody>
</table>

<div class="line"></div>

<div class="center">
  Kitchen Order Ticket
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
};
 return (
  <div className="w-96 h-full mt-2 bg-white p-4 flex flex-col">
    <div className="overflow-y-auto">
    <div className="flex items-center justify-between mb-3 px-3 py-2 bg-white border rounded-md">
  
  <div className="flex items-center gap-2">
    <h2 className="text-base font-semibold text-gray-800">
      {tableId}
    </h2>

    {selectedTable === tableId && (
      <span className="bg-green-200 text-green-700 text-md px-2 py-0.5 rounded-full">
        Active
      </span>
    )}
  </div>

  <button
    onClick={() => clearCart(tableId)}
    className="bg-red-500 hover:bg-red-600 text-white text-md px-3 py-1 rounded transition"
  >
    Clear Cart
  </button>
</div>
      {cart.map((item) => (
        <div
          key={item.itemId}
          className="flex items-center justify-between mb-3"
        >
          {/* Item Name */}
          <p className="w-24 truncate">{item.item}</p>

          {/* Price */}
          <div className="flex items-center gap-1">
            <span className="text-sm">₹</span>
            <input
              type="number" 
              value={item.price}
              step="0.5"
              min="0"
              onChange={(e) =>
                updatePrice(tableId, item.itemId, e.target.value)
              }
              className="w-16 px-1 border rounded appearance-none"
            />
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => decreaseQty(tableId,item.itemId)}
              className="bg-gray-300 px-3 py-1"
            >
              -
            </button>

            <input
             type="number"
             value={item.qty}
              min="0"
              step="0.5"
              onChange={(e) =>
                updateQty(tableId, item.itemId, e.target.value)
              }
              className="w-12 text-center border rounded appearance-none"
            />

            <button
              onClick={() => increaseQty(tableId, item.itemId)}
              className="bg-gray-300 px-3 py-1"
            >
              +
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => removeItem(tableId, item.itemId)}
            className="text-red-500 text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>
      ))}
    </div>

    {/* TOTAL SECTION */}
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
    <div className="w-full flex gap-2 mt-2">
  <button
    onClick={handlePrintBill}
    className="bg-green-600 text-white w-60 py-2 rounded cursor-pointer"
  >
    Print Bill
  </button>

  <button
    onClick={handlePrintKOT}
    className="bg-blue-600 text-white w-40 py-2 rounded cursor-pointer"
  >
    KOT
  </button>
</div>
    </div>
  </div>
);
}

export default BillPanel;