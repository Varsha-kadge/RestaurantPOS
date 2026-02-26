import { useCart } from "../context/useCart";
import { restaurantInfo } from "../data/restaurant";
import { generateBillNumber } from "../Utils/billNumber";
import { useState } from "react";

function PrintBill() {
  const { cart } = useCart();
  const [billNo] = useState(() => generateBillNumber());

  const GST_RATE = 0.05;

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const gstAmount = subtotal * GST_RATE;
  const grandTotal = subtotal + gstAmount;

  return (
    <div className="p-6 bg-white">
      <div className="max-w-md mx-auto border p-6 text-sm">

        <div className="text-center font-bold text-lg">
          {restaurantInfo.name}
        </div>
        <div className="text-center">
          {restaurantInfo.address}
        </div>
        <div className="text-center mb-3">
          GSTIN: {restaurantInfo.gstin}
        </div>

        <div className="flex justify-between">
          <span>Bill No: {billNo}</span>
          <span>
            {new Date().toLocaleString()}
          </span>
        </div>

        <hr className="my-3" />

        <table className="w-full text-left">
          <thead>
            <tr>
              <th>Item</th>
              <th className="text-center">Qty</th>
              <th className="text-right">Price</th>
              <th className="text-right">Total</th>
            </tr>
          </thead>

          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td className="text-center">{item.qty}</td>
                <td className="text-right">₹{item.price}</td>
                <td className="text-right">
                  ₹{item.price * item.qty}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr className="my-3" />

        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span>GST (5%)</span>
          <span>₹{gstAmount.toFixed(2)}</span>
        </div>

        <div className="flex justify-between font-bold text-lg mt-2">
          <span>Grand Total</span>
          <span>₹{grandTotal.toFixed(2)}</span>
        </div>

        <div className="text-center mt-6">
          Thank You! Visit Again 🙏
        </div>

        <button
          onClick={() => window.print()}
          className="mt-4 w-full bg-green-600 text-white py-2 rounded print:hidden"
        >
          Print Bill
        </button>
      </div>
    </div>
  );
}

export default PrintBill;