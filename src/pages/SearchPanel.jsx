import { useState } from "react";
import BillPanel from "../components/BillPanel";
import { useCart } from "../context/useCart";

export default function AddItem({ menuItems, restoInfo }) {

  const [search, setSearch] = useState("");
  const [qty, setQty] = useState({});
  const { addToCart } = useCart();
  const filteredItems = menuItems.filter(item =>
    item.item.toLowerCase().includes(search.toLowerCase())
  );

  const handleQtyChange = (id, value) => {
    setQty({ ...qty, [id]: value });
  };

  const handleAdd = (item) => {
  
    const quantity = qty[item.itemId] || 1;

    addToCart({
      storeId:item.storeId,
      categorieId:item.categorieId,
      itemId:item.itemId,
      item: item.item,
      price: item.price,
      gst:item.gst,
      qty: Number(quantity)
    });

    setSearch("");
  };

  return (
    <div className="flex flex-1 overflow-hidden">
         
   <div className="w-full max-w-xl mx-auto p-4">

  <input
    type="text"
    placeholder="Search item..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full border border-gray-300 rounded-lg px-4 py-2 
               focus:outline-none focus:ring-2 focus:ring-blue-500"
  />

  {search && (
    <div className="mt-2 bg-white border border-gray-200 rounded-lg shadow-md max-h-64 overflow-y-auto">

      {filteredItems.map((item) => (
        <div
          key={item.itemId}
          className="flex items-center justify-between p-3 border-b hover:bg-gray-50"
        >

          <span className="text-gray-800 font-medium">
            {item.item}
          </span>

          <input
            type="number"
            min="1"
            placeholder="1"
            value={qty[item.itemId]}
            onChange={(e) =>
              handleQtyChange(item.itemId, e.target.value)
            }
            className="w-16 border border-gray-300 rounded-md px-2 py-1 text-center"
          />

          <button
            onClick={() => handleAdd(item)}
            className="bg-green-500 text-white px-3 py-1 rounded-md 
                       hover:bg-green-600 transition"
          >
            Add
          </button>

        </div>
      ))}

    </div>
  )}

</div>
 <BillPanel restaurantInfo={restoInfo} />
        </div>
  );
}