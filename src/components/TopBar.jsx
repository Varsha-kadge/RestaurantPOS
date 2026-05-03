import { useEffect, useState} from "react";
import logo from '../assets/logo.jpeg'
import SearchPanel from "../pages/SearchPanel"

export default function Topbar({ onCatClick, searchTerm, setSearchTerm,selectedStoreID,setSlectedStoreID,products,restoInfo}) {
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
  const fetchItems = async () => {
    try {
      const response = await fetch(
        "http://localhost:6035/bo-pos/getCategoryData?storeId="+selectedStoreID,
        {
      headers: {
        "ngrok-skip-browser-warning": "true",
      },
    }
      );
      const data = await response.json();

      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  fetchItems();
}, []);
const handleLogout = () => {
    setSlectedStoreID(null); // 🔥 this logs out
  };
  return (
   <div className="bg-white shadow-sm px-4 py-2">

  {/* 🔹 TOP ROW */}
  <div className="flex items-center justify-between gap-4">

    {/* Logo */}
    <img
      src={logo}
      alt="logo"
      className="w-[70px] h-[50px] object-contain"
    />

    {/* Search */}
    <div className="flex-1 max-w-md relative">
      <SearchPanel
        menuItems={products}
        restoInfo={restoInfo}
      />
    </div>

    {/* Logout */}
    <button
      onClick={handleLogout}
      className="bg-gray-500 text-white px-3 py-1 rounded-lg whitespace-nowrap"
    >
      Logout →
    </button>
  </div>

  {/* 🔹 CATEGORY ROW */}
  <div className="flex flex-wrap gap-2 mt-3">

    <button
      onClick={() => onCatClick("All")}
      className="bg-gray-500 text-white px-3 py-1 rounded-lg"
    >
      All
    </button>

    {categories.map((cat) => (
      <button
        key={cat.categorieId}
        className="bg-orange-500 text-white px-3 py-1 rounded-lg"
        onClick={() => onCatClick(cat)}
      >
        {cat.categoriesName}
      </button>
    ))}

  </div>
</div>
  );
}

//export default Topbar;