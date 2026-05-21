import { useNavigate } from "react-router-dom";

export default function Sidebar(){

  const navigate = useNavigate();

  return (
    <div className="w-35 bg-gray-900 text-white flex flex-col">
      <h2 className="p-4 text-xl font-bold">POS</h2>
      <button
        className="p-3 hover:bg-gray-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        🏠 HOME
      </button>

      <button
        className="p-3 hover:bg-gray-700 cursor-pointer"
        onClick={() => navigate("/add-item")}
      >
        📋 Counter Billing
      </button>
    </div>
  );
}