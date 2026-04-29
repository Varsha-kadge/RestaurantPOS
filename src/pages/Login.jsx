import { useState } from "react";
import logo from '../assets/logo.jpeg'

export default function Login({ sendData }) {
    const [selectedID, setSlectedID] = useState(null);
    const handleLogin = () => {
  if (selectedID) {
      sendData(selectedID); // 🔥 send data to App.js
    }
};
   return (
   <div className="flex flex-col justify-center items-center h-screen bg-white p-6">
  <div className="shadow-md rounded-lg p-6 bg-white w-80 text-center">
    <img src={logo} alt="logo" className="items-center w-70 h-50 mb-2"  />
    <h3 className="text-lg font-semibold mb-4">Select a store:</h3>

    <select
      className="border w-full mb-4 mt-1 p-2 rounded"
      value={selectedID}
      onChange={(e) => setSlectedID(e.target.value)}
    >
      <option value="">-- Choose --</option>
      <option value="1">Store 1</option>
      <option value="2">Store 2</option>
    </select>

    <button
      onClick={handleLogin}
      className="bg-green-600 text-white px-4 py-2 rounded-lg w-full hover:bg-green-700 transition"
    >
      Login
    </button>

  </div>
</div>
  );
}

//export default BillingPage;