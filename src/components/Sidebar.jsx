import { useNavigate } from "react-router-dom";

export default function Sidebar(){

  const navigate = useNavigate();

  return (
    <div className="w-35 bg-gray-900 text-white flex flex-col">
      <h2 className="p-4 text-xl font-bold">POS</h2>
      <button
        className="p-3 hover:bg-gray-700"
        onClick={() => navigate("/")}
      >
        🏠 HOME
      </button>

      <button
        className="p-3 hover:bg-gray-700"
        onClick={() => navigate("/add-item")}
      >
        📋 Add Item
      </button>
    </div>
  );
}