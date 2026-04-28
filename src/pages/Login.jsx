import { useState } from "react";
export default function Login({ setSlectedStoreID }) {
    const [selectedID, setSlectedID] = useState(null);
    const handleLogin = () => {
  if (selectedID) {
      setSlectedStoreID(selectedID); // 🔥 send data to App.js
    }
};
   return (
    <div className="w-96 h-full  bg-white shadow-amber-50 p-6 flex flex-col">
<h3>Select a store:</h3>
      <select value={selectedID} onChange={(e) => setSlectedID(e.target.value)}>
        <option value="">-- Choose --</option>
        <option value="1">1</option>
        <option value="2">2</option>

      </select>
     <button onClick={handleLogin} className="bg-gray-500 text-white px-2 py-1 rounded-lg cursor-pointer">Login</button>
      {/* {selected && <p>You selected: {selected}</p>} */}
    </div>
  );
}

//export default BillingPage;